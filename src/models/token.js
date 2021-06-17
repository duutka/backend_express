/* NPM */
import jwt from 'jsonwebtoken';

/* OTHER */
import pool from '../config/db.config.js';
import Person from '../models/person.js';
import PersonDto from '../dtos/person-dto.js';

/* Get token by login */
const findByLogin = (login) =>
    new Promise(async (resolve, reject) => {
        try {
            const token = await pool.query('SELECT * FROM token WHERE person_login = $1', [login]);

            resolve(token.rows[0]);
        } catch (error) {
            reject(error);
        }
    });

/* Get token by refresh токен */
const findByToken = (refreshToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const token = await pool.query('SELECT * FROM token WHERE refresh_token = $1', [
                refreshToken,
            ]);

            resolve(token.rows[0]);
        } catch (error) {
            reject(error);
        }
    });

/* Save token */
const save = ({ login, refreshToken }) =>
    new Promise(async (resolve, reject) => {
        try {
            const token = await findByLogin(login);

            if (token) {
                await pool.query(
                    `UPDATE token
                    SET refresh_token = $1
                    WHERE person_login = $2`,
                    [refreshToken, login],
                );
            } else {
                await pool.query(
                    `INSERT INTO token
                    (person_login, refresh_token)
                    VALUES ($1, $2)`,
                    [login, refreshToken],
                );
            }

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

/* Delete token by refresh token */
const deleteByRefreshToken = (refreshToken) =>
    new Promise(async (resolve, reject) => {
        try {
            await pool.query(`DELETE FROM token WHERE refresh_token = $1`, [refreshToken]);

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
};

const validateAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
const validateRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

const refresh = (refreshToken) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!refreshToken) {
                throw new Error('Пользователь не авторизирован');
            }

            const person = validateRefreshToken(refreshToken);

            const tokenFromDb = await findByToken(refreshToken);

            if (!person || !tokenFromDb) {
                throw new Error('Пользователь не авторизирован');
            }

            const personFromDb = await Person.findByLogin(person.login);

            const personDto = PersonDto(personFromDb);

            const tokens = generateTokens(personDto);

            await save({ login: person.login, refreshToken });

            resolve({ ...tokens, person: personDto });
        } catch (error) {
            reject(error);
        }
    });

export default {
    findByLogin,
    findByToken,
    save,
    deleteByRefreshToken,
    generateTokens,
    refresh,
    validateAccessToken,
    validateRefreshToken,
};
