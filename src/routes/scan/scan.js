/* NPM */
import { Router } from 'express';

/* OTHER */
import scanController from '../../controllers/scan/index.js';
import upload from '../../config/multer.config.js';

const router = Router();

router.post('/scans', upload.single('image'), scanController.postScans);

export default router;