import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = 'clave_super_secreta'; 

interface JwtPayload {
    name: string;
    lastName: string;
    email: string;
    fair: any;
    iat: number;
    exp: number;
}


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token no proporcionado' });
    } else {

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token inválido o expirado' });
        }
    }
}
