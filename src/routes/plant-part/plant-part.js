/* NPM */
import { Router } from 'express';

/* OTHER */
import plantPartController from '../../controllers/plant-part/index.js';

const data = [
    {id:0,name: 'leaves ' },
    {id:1,name: 'flowers ' },
    {id:2,name: 'fruits ' }
]

const router = Router();

router.get('/plant-parts', plantPartController.getPlantParts);

export default router;