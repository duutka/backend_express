/* NPM */
import { Router } from 'express';

/* OTHER */
import diseaseController from '../controllers/disease.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/diseases', diseaseController.findAll);

router.get('/diseases/:id', validator.validatorId, validator.result, diseaseController.findById);

router.post('/diseases', validator.validatorName, validator.result, diseaseController.add);

export default router;
