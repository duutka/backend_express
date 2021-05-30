/* OTHER */
import pool from '../../config/db.config.js';

const getPlants = async (req, res) => {
    try {
        const plants = await pool.query('SELECT * FROM PLANT');
        res.status(200).json(plants.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }

}

export default getPlants;