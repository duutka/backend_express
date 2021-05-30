/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import plantPartController from '../controllers/plant-part.js';

const router = Router();

router.get('/plant-parts', plantPartController.findAll);

router.get('/plant-parts/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    plantPartController.findById);

router.post('/plant-parts',
    [
        check('nameRu', 'Необходимо название на русском')
        .trim()
        .exists()
        .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    plantPartController.add);

export default router;
