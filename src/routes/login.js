/* NPM */
import { Router } from 'express';
import session from 'express-session';
// import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';

/* OTHER */
import loginController from '../controllers/login.js';
import validator from '../middleware/validator.js';

dotenv.config();

const router = Router();

const csrfProtection = csrf({ cookie: false });

// router.use(cookieParser());

router.use(
    session({
        name: 'SESSION_LEAFS',
        secret: `${process.env.SESSION_SECRET}`,
        saveUninitialized: true,
        resave: true,
        duration: 60 * 60 * 1000,
    }),
);

router.get('/login', csrfProtection, loginController.csrfTokenGet);

router.post('/login', csrfProtection, loginController.verifyUser, loginController.authUser);

router.post('/register', loginController.registerUser);

export default router;
