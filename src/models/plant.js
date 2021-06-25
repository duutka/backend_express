/* POOL */
import pool from '../config/db.config.js';

/* Get all plants */
const findAll = async () => {
    const plants = await pool.query('SELECT * FROM plant');

    return plants.rows;
};

/* Get plant by id */
const findById = async (id) => {
    const plant = await pool.query('SELECT * FROM plant WHERE id = $1', [id]);

    return plant.rows[0];
};

/* Create new plant */
const add = async ({ nameEn, nameRu }) => {
    const result = await pool.query(
        `INSERT INTO plant
        (name_en, name_ru)
        VALUES ($1, $2)
        RETURNING id`,
        [nameEn, nameRu],
    );

    return result.rows[0].id;
};

export default { findAll, findById, add };
