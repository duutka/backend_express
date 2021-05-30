/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import scanController from '../controllers/scan.js';
import upload from '../config/multer.config.js';

const router = Router();

router.get('/scans', scanController.findAll);

router.get('/scans/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    scanController.findById);

// TODO: image field validation
router.post('/scans',
    [
        check('plantData.*.plantId', 'Некорректный id растения').isNumeric(),
        check('plantData.*.diseaseId', 'Некорректный id болезни').isNumeric(),
        check('plantData.*.plantpartId', 'Некорректный id органа растения').isNumeric(),
    ],
    upload.single('image'),
    scanController.add);

export default router;