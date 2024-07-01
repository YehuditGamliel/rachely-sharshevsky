import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port:8080,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
});

async function executeTransactionQuery(date, params) {
    let connection, results, paramsOfPurchase;
    try {
        console.log(params)
        connection = await pool.getConnection();
        await connection.beginTransaction();
        [results] = await connection.query(
            `INSERT INTO eyesdata (SPHRight, SPHLeft, CYLRight, CYLLeft, PDFAR, PDNEAR,idKindOfGlasses, idCU6, idKindOfPrescription)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,Object.values(params[0]));
        console.log("res", results);
        paramsOfPurchase = [...Object.values(params[1]), results.insertId]
        console.log("paramsOfPurchase",paramsOfPurchase)
        await connection.query(
           `INSERT INTO purchase (userName, date, price, status, model, idEyeData)
             VALUES (?, ${date},?, 1 ,?, ?)`,paramsOfPurchase );
             console.log("@@@@@@@@@@@@@@@@@@@@2222",Object.values(params[2]))
        await connection.query(
           `UPDATE eyeglasses SET stock = ? WHERE model = ?`,Object.values(params[2]))
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
    console.log("kkkkkkkkkkkk")
    return results;
}
export { executeTransactionQuery };
