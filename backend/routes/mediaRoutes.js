import express from 'express';
import multer from 'multer';
import path from 'path';
import { getMedia, uploadMedia } from '../controllers/mediaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `media-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => /image|video/.test(file.mimetype)
        ? cb(null, true)
        : cb(new Error('Invalid file type'), false),
});

// Protect all media routes
router.use(protect);

// GET /api/media
router.get('/', getMedia);

// POST /api/media
router.post('/', upload.single('file'), uploadMedia);

export default router;