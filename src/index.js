/* NPM */
import express from 'express';
import cors from 'cors';

/* OTHER */
import routes from './routes/routes.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use('/deseases', routes.deseases);
app.use('/plant-parts', routes.plantParts);
app.use('/plants', routes.plants);
app.use('/scans', routes.scans);

/* PORT */
const PORT = process.env.PORT || 8000;

/* LISTEN */
app.listen(PORT);

