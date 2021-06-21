/* POOL */
import pool from '../config/db.config.js';

/* Get all scans */
const findAll = async () => {
    const scans = await pool.query('SELECT * FROM scan_vw');

    return scans.rows;
};

/* Get scan by id */
const findById = async (id) => {
    const scan = await pool.query('SELECT * FROM scan_vw WHERE id = $1', [id]);

    return scan.rows[0];
};

/* Create new scan */
const add = async ({ plantId, diseaseId, plantpartId, imageName }) => {
    const result = await pool.query(
        `INSERT INTO scan
        (plant_id, disease_id, plant_part_id, image_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [plantId, diseaseId, plantpartId, imageName],
    );

    return result.rows[0].id;
};
export default { findAll, findById, add };
