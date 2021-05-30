/* OTHER */
import pool from '../../config/db.config.js';

const getPlantParts = async (req, res) => {
    try {
        const plantParts = await pool.query('SELECT * FROM PLANT_PART');
        res.status(200).json(plantParts.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }

}

export default getPlantParts;