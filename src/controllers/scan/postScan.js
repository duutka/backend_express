/* OTHER */
import pool from '../../config/db.config.js';

const postScans = async (req, res) => {
    try{
        console.log(req.file);
        
        const { plantData } = req.body;

        // const newScan = await pool.query('INSER INTO SCAN')

        console.log("PlantId = ", plantData.plantId);
        console.log("DeseaseId = ", plantData.deseaseId);
        console.log("PlanpartId = ", plantData.planpartId);

        res.status(200).json('success');
    }
    catch (err) {
        res.status(500).json("Server Error: " + err);
    }
}

export default postScans;