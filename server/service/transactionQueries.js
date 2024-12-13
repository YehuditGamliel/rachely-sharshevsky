import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
});

async function executeTransactionQuery(date, params) {
    let connection, resultsEyeData, paramsOfPurchase, resultStock,rows;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        [resultsEyeData] = await connection.query(
            `INSERT INTO eyesdata (SPHRight, SPHLeft, CYLRight, CYLLeft, PDFAR, PDNEAR,idKindOfGlasses, idCU6, idKindOfPrescription)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(params[0]));
        paramsOfPurchase = [...Object.values(params[1]), resultsEyeData.insertId]
        await connection.query(
            `INSERT INTO purchase (userName, date, price, status, model, idEyeData)
             VALUES (?, ${date},?, 1 ,?, ?)`, paramsOfPurchase);
        await connection.query(
            `UPDATE eyeglasses SET stock = stock - 1
             WHERE model = ?;`,Object.values(params[2]))
        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
    return resultsEyeData;
}
export { executeTransactionQuery };
