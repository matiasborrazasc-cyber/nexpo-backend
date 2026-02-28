import { Request, Response } from "express";
import { getInfluencerByLink, incrementViews } from "../db/influencerMysql";

/**
 * Ruta pública: cuando alguien entra a /api/influencers/go/:link
 * se registra la visita y se redirige a la URL de redirección guardada para ese influencer.
 */
export const redirectByLink = async (req: Request, res: Response) => {
    try {
        const link = req.params.link;
        if (!link) {
            res.status(400).json({ message: "Link requerido", status: 400, data: null });
            return;
        }
        const influencer = await getInfluencerByLink(link);
        if (!influencer || !influencer.getRedirection()) {
            res.status(404).json({ message: "No encontrado", status: 404, data: null });
            return;
        }
        await incrementViews(influencer.getUuid());
        const redirectionUrl = influencer.getRedirection();
        if (!redirectionUrl.startsWith("http://") && !redirectionUrl.startsWith("https://")) {
            res.redirect(302, "https://" + redirectionUrl);
            return;
        }
        res.redirect(302, redirectionUrl);
    } catch (err: any) {
        res.status(500).json({ message: err.message, status: 500, data: null });
    }
};
