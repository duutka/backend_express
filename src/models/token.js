/* NPM */
import jwt from 'jsonwebtoken';

/* OTHER */
import pool from '../config/db.config.js';
import Person from '../models/person.js';
import PersonDto from '../dtos/person-dto.js';
import ApiError from '../exceptions/apiError.js';

/* Get token by login */
const findByLogin = async (login) => {
    const token = await pool.query('SELECT * FROM token WHERE person_login = $1', [login]);

    return token.rows[0];
};

/* Get token by refresh токен */
const findByToken = async (refreshToken) => {
    const token = await pool.query('SELECT * FROM token WHERE refresh_token = $1', [refreshToken]);

    return token.rows[0];
};

/* Save token */
const save = async ({ login, refreshToken }) => {
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

    return true;
};

/* Delete token by refresh token */
const deleteByRefreshToken = async (refreshToken) => {
    const { rowCount } = await pool.query(`DELETE FROM token WHERE refresh_token = $1`, [
        refreshToken,
    ]);
    return rowCount;
};

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

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }

    const person = validateRefreshToken(refreshToken);

    const tokenFromDb = await findByToken(refreshToken);

    if (!person || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }

    const personFromDb = await Person.findByLogin(person.login);

    const personDto = PersonDto(personFromDb);

    const tokens = generateTokens(personDto);

    await save({ login: person.login, refreshToken });

    return { ...tokens, person: personDto };
};

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
