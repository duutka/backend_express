/* NPM */
import { Router } from 'express';

/* OTHER */
import profileController from '../controllers/profile.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/plants', profileController.profile);

export default router;
