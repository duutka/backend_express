/* NPM */
import crypto from 'crypto';
import dotenv from 'dotenv';

/* OTHER */
import Person from '../models/person.js';
import PersonDto from '../dtos/person-dto.js';
import Token from '../models/token.js';

dotenv.config();

const getCsrfToken = async (req, res) => {
    try {
        res.status(200).json({ csrfToken: req.csrfToken() });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const register = async (req, res) => {
    try {
        const { login, password, firstname, lastname } = req.body;

        // Проверка на существующий логин
        const person = await Person.findByLogin(login);

        if (person) {
            return res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
        }

        // Хэшируем пароль
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');

        const hashPass = salt + '$' + hash;

        // Добавление пользователя в бд
        await Person.add({
            login,
            password: hashPass,
            firstname,
            lastname,
        });

        // Создание объекта пользователя без лишних свойств
        const personDto = PersonDto({ login, password, firstname, lastname });
        const tokens = Token.generateTokens({ ...personDto });

        // Сохранение refresh токена в бд
        await Token.save({ login, refreshToken: tokens.refreshToken });

        // Добавление refresh токена в куки
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        res.status(200).json({
            message: 'Пользователь зарегистрирован',
            ...tokens,
            person: personDto,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const verify = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        const person = await Person.findByLogin(login);
        if (!person) {
            res.status(404).send({ error: 'Неверный логин или пароль' });
        } else {
            const passwordFields = person.password.split('$');
            const salt = passwordFields[0];
            const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
            if (hash === passwordFields[1]) {
                req.body = {
                    login: person.login,
                    firstname: person.lastname,
                    lastname: person.lastname,
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

const auth = async (req, res) => {
    try {
        const { login, firstname, lastname } = req.body;

        // Создание объекта пользователя без лишних свойств
        const personDto = PersonDto({ login, firstname, lastname });
        const tokens = Token.generateTokens({ ...personDto });

        // Сохранение refresh токена в бд
        await Token.save({ login, refreshToken: tokens.refreshToken });

        // Добавление refresh токена в куки
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        res.status(201).send({
            ...tokens,
            person: personDto,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await Token.deleteByRefreshToken(refreshToken);

        // Добавление refresh токена в куки
        res.clearCookie('refreshToken');

        res.status(201).send({ refreshToken });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        const data = await Token.refresh(refreshToken);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

const profile = async (req, res) => {
    try {
        const { person } = req;

        if (!person || req.error) {
            throw new Error(req.error ?? 'Не удалось получить профиль пользователя');
        }

        const personFromDb = await Person.findByLogin(person.login);

        const personDto = PersonDto(personFromDb);

        res.status(200).json(personDto);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export default { getCsrfToken, verify, register, auth, logout, refresh, profile };
