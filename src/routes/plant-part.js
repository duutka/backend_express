/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import plantPartController from '../controllers/plant-part.js';

const router = Router();

router.get('/plant-parts', plantPartController.all);
router.get('/plant-part/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    plantPartController.byId);
router.post('/plant-part',
    [
        check('nameRu', 'Необходимо название на русском')
        .trim()
        .exists()
        .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    plantPartController.create);

export default router;
