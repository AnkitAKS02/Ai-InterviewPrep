import express from 'express';
import {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    uploadResumeImage,
} from '../controllers/resume.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
//68c4567af0b09206746549c2
router.post('/', protectRoute, createResume);
router.get('/', protectRoute, getUserResumes);
router.get('/:id', protectRoute, getResumeById);
router.put('/:id', protectRoute, updateResume);
router.put('/:id/upload-image', protectRoute, uploadResumeImage);// api not checked = check after wards
router.delete('/:id', protectRoute, deleteResume);

export default router;