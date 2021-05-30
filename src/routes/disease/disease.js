/* NPM */
import { Router } from 'express';

/* OTHER */
import diseaseController from '../../controllers/disease/index.js';

const data = [
    {id:0,name: 'healthy ' },
    {id:1,name: 'rust ' },
    {id:2,name: 'scab ' },
    {id:3,name: 'woolly whitefly ' },
    {id:4,name: 'raisin moth ' },
    {id:5,name: 'grape leafhopper ' },
    {id:6,name: 'thrips ' },
    {id:7,name: 'tortoise wax scale ' },
    {id:8,name: 'healthy  ' },
]; 

const router = Router();

router.get('/diseases', diseaseController.getDisease);

export default router;
