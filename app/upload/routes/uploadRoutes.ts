import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '../../middleware/auth.middleware';
import {
    uploadStandImage,
    uploadBlogImage,
    uploadSpeakerImage,
    uploadEventImage,
    uploadSponsorImage,
    uploadBannerImage,
    uploadProductImage,
    ensureUploadsDir,
} from '../controllers/uploadController';

ensureUploadsDir();

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowed = /jpeg|jpg|png|gif|webp/i;
    const ext = path.extname(file.originalname).slice(1) || '';
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, png, gif, webp)'));
    }
};

function makeMulter(folder: string) {
    return multer({
        storage: multer.diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, path.join(process.cwd(), 'uploads', folder));
            },
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname) || '.jpg';
                cb(null, `${uuidv4()}${ext}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter,
    });
}

const router = Router();
router.post('/stand-image', verifyToken, makeMulter('stands').single('file'), uploadStandImage);
router.post('/blog-image', verifyToken, makeMulter('blog').single('file'), uploadBlogImage);
router.post('/speaker-image', verifyToken, makeMulter('speakers').single('file'), uploadSpeakerImage);
router.post('/event-image', verifyToken, makeMulter('events').single('file'), uploadEventImage);
router.post('/sponsor-image', verifyToken, makeMulter('sponsors').single('file'), uploadSponsorImage);
router.post('/banner-image', verifyToken, makeMulter('banners').single('file'), uploadBannerImage);
router.post('/product-image', verifyToken, makeMulter('products').single('file'), uploadProductImage);

export default router;
