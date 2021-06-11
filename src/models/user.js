/* OTHER */
import pool from '../config/db.config.js';

/* Get user by login */
const findByLogin = (login) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await pool.query('SELECT * FROM "user" WHERE login = $1', [login]);

            resolve(user.rows[0]);
        } catch (error) {
            reject(error);
        }
    });

/* Create new user */
const add = ({ login, password, firstname, lastname }) =>
    new Promise(async (resolve, reject) => {
        try {
            await pool.query(
                `INSERT INTO "user"
                (login, password, firstname, lastname)
                VALUES ($1, $2, $3, $4)`,
                [login, password, firstname, lastname],
            );

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

export default { findByLogin, add };
