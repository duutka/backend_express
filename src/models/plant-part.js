/* OTHER */
import pool from '../config/db.config.js';

/* Get all plant parts */
const all = () => new Promise(async (resolve, reject) => {
    try {
        const plantParts = await pool.query('SELECT * FROM plant_part');

        resolve(plantParts.rows);
    }
    catch (error) {
        reject(error);
    }
});

/* Get plant part by id */
const byId = (id) => new Promise(async (resolve, reject) => {
    try {
        const plantPart = await pool.query('SELECT * FROM plant_part WHERE id = $1', [id]);

        resolve(plantPart.rows[0]);
    }
    catch (error) {
        reject(error);
    }
});

/* Create new plant part */
const create = ({ nameEn, nameRu }) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await pool.query(`INSERT INTO plant_part
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

export default { all, byId, create };

