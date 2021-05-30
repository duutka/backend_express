/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import diseaseController from '../controllers/disease.js';

const router = Router();

router.get('/diseases', diseaseController.all);
router.get('/disease/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    diseaseController.byId);
router.post('/disease',
    [
        check('nameRu', 'Необходимо название на русском')
            .trim()
            .exists()
            .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    diseaseController.create);

export default router;
