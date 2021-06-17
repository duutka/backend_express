/* NPM */
import { Router } from 'express';
import session from 'express-session';
import csrf from 'csurf';
import dotenv from 'dotenv';

/* OTHER */
import personController from '../controllers/person.js';
import validator from '../middleware/validator.js';

dotenv.config();

const router = Router();

const csrfProtection = csrf({ cookie: false });

router.use(
    session({
        name: 'SESSION_LEAFS',
        secret: `${process.env.SESSION_SECRET}`,
        saveUninitialized: true,
        resave: true,
    }),
);

router.get('/login', csrfProtection, personController.getCsrfToken);

router.post('/login', csrfProtection, personController.verify, personController.auth);

router.post('/register', personController.register);

router.post('/logout', personController.logout);

router.get('/refresh', personController.refresh);

router.get('/profile', validator.validateAuth, personController.profile);

export default router;
