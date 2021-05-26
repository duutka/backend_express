/* NPM */
import { Router } from 'express';

const data = [
    {id:0,name: '    apple ' },		
    {id:1,name:'    citrus ' },		
    {id:2,name:'    feijoa ' },		
    {id:3,name:'    figs ' },		
    {id:4,name:'    grape ' },		
    {id:5,name:'    laurel ' },		
    {id:6,name:'    loquat ' },		
    {id:7,name:'    merry ' },		
    {id:8,name:'    pear ' },		
    {id:9,name:'    persimmon ' },	
    {id:10,name:'    punica ' },		
    {id:11,name:'    tulip ' },		
    {id:12,name:'    rose ' },		
    {id:13,name:'    cucumber ' },		
    {id:14,name:'    celery ' },		
    {id:15,name:'    mint ' },		
    {id:16,name:'    violet ' }	,	
    {id:17,name:'    tradiscantion ' }	,	
    {id:18,name:'    gloxinia ' },		
    {id:19,name:'    coleus ' }	,	
    {id:20,name:'    cyclamen ' },		
    {id:21,name:'    radish ' }	,	
    {id:22,name:'    tomato ' }	,	
    {id:23,name:'    kalanchoe ' },		
    {id:24,name:'    scheffler ' },		
    {id:25,name:'    parsley ' },		
    {id:26,name:'    fuchsia ' },		
    {id:27,name:'    geranium ' },		
    {id:28,name:'    calceolaria ' },		
    {id:29,name:'    chrysanthemum ' },		
    {id:30,name:'    begonia ' }	,	
    {id:31,name:'    hydrangea ' }		
];

const router = Router();

router.get('/', (req, res) => {
    return res.json(data);
});

export default router;
