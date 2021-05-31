/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import diseaseController from '../controllers/disease.js';

const router = Router();

router.get('/diseases', diseaseController.findAll);

router.get('/diseases/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    diseaseController.findById);

router.post('/diseases',
    [
        check('nameRu', 'Необходимо название на русском')
            .trim()
            .exists()
            .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    diseaseController.add);

export default router;
