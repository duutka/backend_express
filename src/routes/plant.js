/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import plantController from '../controllers/plant.js';

const router = Router();

router.get('/plants', plantController.findAll);

router.get('/plants/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    plantController.findById);

router.post('/plants',
    [
        check('nameRu', 'Необходимо название на русском')
        .trim()
        .exists()
        .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    plantController.add);

export default router;
