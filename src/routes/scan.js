/* NPM */
import { Router } from 'express';

/* OTHER */
import scanController from '../controllers/scan.js';
import upload from '../config/multer.config.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/scans', scanController.findAll);

router.get('/scans/:id', validator.validatorId, validator.result, scanController.findById);

router.post(
    '/scans',
    validator.validatorPlantData,
    validator.result,
    upload.single('image'),
    validator.validateFile,
    scanController.add,
);

export default router;
