/* OTHER */
import pool from '../config/db.config.js';

/* Get user by login */
const findByLogin = async (login) => {
    const user = await pool.query('SELECT * FROM person WHERE login = $1', [login]);

    return user.rows[0];
};

/* Create new user */
const add = async ({ login, password, firstname, lastname }) => {
    await pool.query(
        `INSERT INTO person
        (login, password, firstname, lastname)
        VALUES ($1, $2, $3, $4)`,
        [login, password, firstname, lastname],
    );

    return true;
};

export default { findByLogin, add };
