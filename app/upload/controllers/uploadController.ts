import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const UPLOAD_FOLDERS = ['stands', 'blog', 'speakers', 'events', 'sponsors', 'banners', 'products'] as const;

export function ensureUploadsDir() {
    UPLOAD_FOLDERS.forEach((folder) => {
        const dir = path.join(process.cwd(), 'uploads', folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

function makeUploadHandler(folder: string) {
    return async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                res.json({ message: 'No se envió ningún archivo', status: 400, data: null });
                return;
            }
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const fileUrl = `${baseUrl}/uploads/${folder}/${req.file.filename}`;
            res.json({
                message: '',
                status: 200,
                data: { url: fileUrl },
            });
        } catch (err: any) {
            res.json({
                message: err?.message || 'Error al subir la imagen',
                status: 400,
                data: null,
            });
        }
    };
}

export const uploadStandImage = makeUploadHandler('stands');
export const uploadBlogImage = makeUploadHandler('blog');
export const uploadSpeakerImage = makeUploadHandler('speakers');
export const uploadEventImage = makeUploadHandler('events');
export const uploadSponsorImage = makeUploadHandler('sponsors');
export const uploadBannerImage = makeUploadHandler('banners');
export const uploadProductImage = makeUploadHandler('products');
