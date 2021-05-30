/* OTHER */
import pool from '../config/db.config.js';

/* Get all diseases */
const findAll = () => new Promise(async (resolve, reject) => {
    try {
        const disease = await pool.query('SELECT * FROM disease');

        resolve(disease.rows);
    }
    catch (error) {
        reject(error);
    }
});

/* Get disease by id */
const findById = (id) => new Promise(async (resolve, reject) => {
    try {
        const disease = await pool.query('SELECT * FROM disease WHERE id = $1', [id]);

        resolve(disease.rows[0]);
    }
    catch (error) {
        reject(error);
    }
});

/* Create new disease */
const add = ({ nameEn, nameRu }) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await pool.query(`INSERT INTO disease
                (name_en, name_ru)
                VALUES ($1, $2)
                RETURNING id`,
                [nameEn, nameRu]);

            resolve(result.rows[0].id);
        }
        catch (error) {
            reject(error);
        }
    });

export default { findAll, findById, add };
