/* NPM */
import { Router } from 'express';
import csrf from 'csurf';

/* OTHER */
import loginController from '../controllers/login.js';
import validator from '../middleware/validator.js';

const router = Router();

const csrfProtection = csrf({ sessionKey: 'SESSION_LEAFS' });

router.get('/login', csrfProtection, loginController.csrfToken);

router.post('/login', csrfProtection, loginController.authUser);

router.post('/register', loginController.registerUser);

export default router;
