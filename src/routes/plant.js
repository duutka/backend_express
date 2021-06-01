/* NPM */
import { Router } from 'express';

/* OTHER */
import plantController from '../controllers/plant.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/plants', plantController.findAll);

router.get('/plants/:id', validator.validatorId, validator.result, plantController.findById);

router.post('/plants', validator.validatorName, validator.result, plantController.add);

export default router;
