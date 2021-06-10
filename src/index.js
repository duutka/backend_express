/* NPM */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import csrf from 'csurf';

/* OTHER */
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'SESSION_LEAFS',
        secret: `${process.env.SECRET}`,
        saveUninitialized: true,
        resave: true,
        duration: 30 * 60 * 1000,
    }),
);

/* ROUTES */
app.use('/', routes.diseases);
app.use('/', routes.plantParts);
app.use('/', routes.plants);
app.use('/', routes.scans);
app.use('/', routes.login);

/* PORT */
const PORT = process.env.PORT;

/* LISTEN */
app.listen(PORT);
