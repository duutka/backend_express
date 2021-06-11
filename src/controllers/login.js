/* NPM */
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

/* OTHER */
import User from '../models/user.js';

dotenv.config();

const csrfTokenGet = async (req, res) => {
    try {
        res.status(200).json({ csrfToken: req.csrfToken() });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { login, password, firstname, lastname } = req.body;

        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');

        const hashPass = salt + '$' + hash;

        await User.add({
            login: login,
            password: hashPass,
            firstname: firstname,
            lastname: lastname,
        })
            .then(() => {
                res.status(200).json({ message: 'Пользователь зарегистрирован' });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error.message,
                    stack: error.stack,
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        const user = await User.findByLogin(login);
        if (!user.login) {
            res.status(404).send({ error: 'Неверный логин или пароль' });
        } else {
            const passwordFields = user.password.split('$');
            const salt = passwordFields[0];
            const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
            if (hash === passwordFields[1]) {
                req.body = {
                    login: user.login,
                    name: user.lastname + ' ' + user.firstname,
                };
                return next();
            } else {
                res.status(404).send({ error: 'Неверный логин или пароль' });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const authUser = async (req, res) => {
    try {
        const refreshLogin = req.body.login + process.env.JWT_SECRET;
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(refreshLogin).digest('base64');
        req.body.refreshKey = salt;
        const token = jwt.sign(req.body, process.env.JWT_SECRET);
        const b = Buffer.from(hash);
        const refreshToken = b.toString('base64');
        res.status(201).send({ accessToken: `Bearer ${token}`, refreshToken: refreshToken });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { csrfTokenGet, verifyUser, registerUser, authUser };
