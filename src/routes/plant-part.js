/* NPM */
import { Router } from 'express';

/* OTHER */
import plantPartController from '../controllers/plant-part.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/plant-parts', plantPartController.findAll);

router.get('/plant-parts/:id', validator.validatorId, validator.result, plantPartController.findById);

router.post('/plant-parts', validator.validatorName, validator.result, plantPartController.add);

export default router;
