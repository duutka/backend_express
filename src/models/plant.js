/* OTHER */
import pool from '../config/db.config.js';

/* Get all plants */
const all = () => new Promise(async (resolve, reject) => {
    try {
        const plants = await pool.query('SELECT * FROM plant');

        resolve(plants.rows);
    }
    catch (error) {
        reject(error);
    }
});

/* Get plant by id */
const byId = (id) => new Promise(async (resolve, reject) => {
    try {
        const plant = await pool.query('SELECT * FROM plant WHERE id = $1', [id]);

        resolve(plant.rows[0]);
    }
    catch (error) {
        reject(error);
    }
});

/* Create new plant */
const create = ({ nameEn, nameRu }) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await pool.query(`INSERT INTO plant
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
