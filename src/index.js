/* NPM */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

/* OTHER */
import routes from './routes/routes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use('/', routes.diseases);
app.use('/', routes.plantParts);
app.use('/', routes.plants);
app.use('/', routes.scans);

/* PORT */
const PORT = process.env.PORT;

/* LISTEN */
app.listen(PORT);

