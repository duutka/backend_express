/* NPM */
import { Router } from 'express';

const data = [
    {id:0,name: 'leaves ' },
    {id:1,name: 'flowers ' },
    {id:2,name: 'fruits ' }
]

const router = Router();

router.get('/', (req, res) => {
    return res.json(data);
});

export default router;