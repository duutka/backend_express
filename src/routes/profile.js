/* NPM */
import { Router } from 'express';
import passport from 'passport';

/* OTHER */
// import profileController from '../controllers/profile.js';
import validator from '../middleware/validator.js';

const router = Router();

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json(req.user);
});

export default router;
