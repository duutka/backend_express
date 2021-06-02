/* OTHER */
import pool from '../config/db.config.js';

/* Get all scans */
const findAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            const scans = await pool.query('SELECT * FROM scan_vw');

            resolve(scans.rows);
        } catch (error) {
            reject(error);
        }
    });

/* Get scan by id */
const findById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const scan = await pool.query('SELECT * FROM scan_vw WHERE id = $1', [id]);

            resolve(scan.rows[0]);
        } catch (error) {
            reject(error);
        }
    });

/* Create new scan */
const add = ({ plantId, diseaseId, plantpartId, imageName }) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await pool.query(
                `INSERT INTO scan
                (plant_id, disease_id, plant_part_id, image_name)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
                [plantId, diseaseId, plantpartId, imageName],
            );

            resolve(result.rows[0].id);
        } catch (error) {
            reject(error);
        }
    });

export default { findAll, findById, add };
