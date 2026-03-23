import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getUserByEmail, createUsers } from "../db/usersMysql";
import UsersFactory from "../usersFactory";
import { createUsersFair, getFairUuidsByUser } from "../../usersFair/db/usersFairMysql";
import UsersFairFactory from "../../usersFair/usersFairFactory";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";

const JWT_SECRET = process.env.JWT_SECRET || "clave_super_secreta";
const DEFAULT_FAIR_UUID = "5755b802-f566-11ef-b15e-02d3accac345";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

async function getAppleSigningKey(kid: string): Promise<crypto.KeyObject> {
  const response = await fetch("https://appleid.apple.com/auth/keys");
  if (!response.ok) throw new Error("No se pudo contactar con Apple");
  const { keys } = (await response.json()) as { keys: Array<{ kid: string; [k: string]: unknown }> };
  const key = keys.find((k) => k.kid === kid);
  if (!key) throw new Error("Clave de Apple no encontrada");
  return crypto.createPublicKey({ key, format: "jwk" });
}

async function verifyAppleToken(identityToken: string): Promise<{ email?: string; sub: string }> {
  const decoded = jwt.decode(identityToken, { complete: true }) as { header: { kid: string }; payload: { email?: string; sub: string } } | null;
  if (!decoded?.header?.kid || !decoded?.payload?.sub) {
    throw new Error("Token de Apple inválido");
  }
  const signingKey = await getAppleSigningKey(decoded.header.kid);
  const verified = jwt.verify(identityToken, signingKey, { algorithms: ["RS256"] }) as { email?: string; sub: string };
  return verified;
}

async function verifyGoogleToken(idToken: string): Promise<{ email?: string; name?: string; sub: string }> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID no configurado");
  }
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload?.sub) throw new Error("Token de Google inválido");
  return {
    email: payload.email,
    name: payload.name,
    sub: payload.sub,
  };
}

export const authSocial = async (req: Request, res: Response) => {
  try {
    const { provider, identityToken, idToken, email, name } = req.body;

    let verifiedEmail: string;
    let verifiedName: string;

    if (provider === "apple") {
      if (!identityToken) {
        res.json({ message: "Falta identityToken", status: 400, data: null });
        return;
      }
      const payload = await verifyAppleToken(identityToken);
      verifiedEmail = payload.email || email;
      verifiedName = name || "";
      if (!verifiedEmail) {
        res.json({ message: "Apple no proporcionó email. Usa 'Ocultar mi email' la primera vez.", status: 400, data: null });
        return;
      }
    } else if (provider === "google") {
      if (!idToken) {
        res.json({ message: "Falta idToken", status: 400, data: null });
        return;
      }
      const payload = await verifyGoogleToken(idToken);
      verifiedEmail = payload.email || email;
      verifiedName = payload.name || name || "";
      if (!verifiedEmail) {
        res.json({ message: "Google no proporcionó email", status: 400, data: null });
        return;
      }
    } else {
      res.json({ message: "Provider inválido (apple|google)", status: 400, data: null });
      return;
    }

    const fairUuid = req.body.fairUuid || DEFAULT_FAIR_UUID;
    let user = await getUserByEmail(verifiedEmail);

    if (!user) {
      const socialPassword = await bcrypt.hash("__SOCIAL_AUTH__" + Date.now(), 10);
      const newUser = UsersFactory.createUsersFromData({
        name: verifiedName || verifiedEmail.split("@")[0],
        email: verifiedEmail,
        role: null,
        password: socialPassword,
        picture: null,
        description: null,
      });
      await createUsers(newUser);
      const userUuid = newUser.getUuid();
      try {
        const usersFair = UsersFairFactory.createUsersFairFromData({
          fair: fairUuid,
          user: userUuid,
        });
        await createUsersFair(usersFair);
      } catch (_) {}
      user = await getUserByEmail(verifiedEmail);
    }

    if (!user) {
      res.json({ message: "Error al crear usuario", status: 500, data: null });
      return;
    }

    let finalFairUuid = fairUuid;
    const userFairs = await getFairUuidsByUser(user.getUuid());
    if (userFairs.length > 0) {
      if (userFairs.includes(fairUuid)) {
        finalFairUuid = fairUuid;
      } else {
        finalFairUuid = userFairs[0];
      }
    }

    const payload = {
      name: user.getName(),
      uuid: user.getUuid(),
      role: user.getRole(),
      fair: { uuid: finalFairUuid },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "",
      status: 200,
      data: {
        token,
        user: UsersFactory.usersToJson(user),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error en auth social";
    res.json({ message, status: 400, data: null });
  }
};
