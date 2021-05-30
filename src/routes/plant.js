/* NPM */
import { Router } from 'express';
import { check } from 'express-validator';

/* OTHER */
import plantController from '../controllers/plant.js';

const router = Router();

router.get('/plants', plantController.all);
router.get('/plant/:id',
    [
        check('id', 'Некорректный id').isNumeric(),
    ],
    plantController.byId);
router.post('/plant',
    [
        check('nameRu', 'Необходимо название на русском')
        .trim()
        .exists()
        .isAlpha('ru-RU', { ignore: ' ' }),
    ],
    plantController.create);

export default router;
