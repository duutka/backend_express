/* NPM */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import passport from 'passport';
import cookieParser from 'cookie-parser';

/* OTHER */
import routes from './routes/index.js';
// import passportConfig from './config/passport.config.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(passport.initialize());
// passportConfig(passport);

/* ROUTES */
app.use('/', routes.diseases);
app.use('/', routes.plantParts);
app.use('/', routes.plants);
app.use('/', routes.scans);
app.use('/', routes.person);

/* PORT */
const PORT = process.env.PORT;

/* LISTEN */
app.listen(PORT);
