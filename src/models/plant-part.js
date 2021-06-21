/* POOL */
import pool from '../config/db.config.js';

/* Get all plant parts */
const findAll = async () => {
    const plantParts = await pool.query('SELECT * FROM plant_part');

    return plantParts.rows;
};

/* Get plant part by id */
const findById = async (id) => {
    const plantPart = await pool.query('SELECT * FROM plant_part WHERE id = $1', [id]);

    return plantPart.rows[0];
};

/* Create new plant part */
const add = async ({ nameEn, nameRu }) => {
    const result = await pool.query(
        `INSERT INTO plant_part
        (name_en, name_ru)
        VALUES ($1, $2)
        RETURNING id`,
        [nameEn, nameRu],
    );

    return result.rows[0].id;
};

export default { findAll, findById, add };
