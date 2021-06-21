/* POOL */
import pool from '../config/db.config.js';

/* Get all diseases */
const findAll = async () => {
    const disease = await pool.query('SELECT * FROM disease');

    return disease.rows;
};

/* Get disease by id */
const findById = async (id) => {
    const disease = await pool.query('SELECT * FROM disease WHERE id = $1', [id]);

    return disease.rows[0];
};

/* Create new disease */
const add = async ({ nameEn, nameRu }) => {
    const result = await pool.query(
        `INSERT INTO disease
        (name_en, name_ru)
        VALUES ($1, $2)
        RETURNING id`,
        [nameEn, nameRu],
    );

    return result.rows[0].id;
};

export default { findAll, findById, add };
