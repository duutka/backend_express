/* OTHER */
import pool from '../../config/db.config.js';

const getDiseases = async (req, res) => {
    try {
        const diseases = await pool.query('SELECT * FROM DISEASE');
        res.status(200).json(diseases.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }

}

export default getDiseases;