/* NPM */
import express from 'express';

/* OTHER */
import routes from './routes/index.js';

const app = express();

app.use(express.json());

/* ROUTES */
app.use('/deseases', routes.deseases);
app.use('/plant-parts', routes.plantParts);
app.use('/plants', routes.plants);

/* PORT */
const PORT = process.env.PORT || 8000;

/* LISTEN */
app.listen(PORT);

