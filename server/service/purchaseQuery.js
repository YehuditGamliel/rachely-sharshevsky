import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    //port:8080,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
});

async function executeQueryPurchase(queries, params) {
    let connection,results,paramsOfPurchase;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        [results] = await connection.query(queries[0].query, Object.values(params[0]));
        paramsOfPurchase = [...Object.values(params[1]), results.insertId]
        await connection.query(queries[1].query, paramsOfPurchase);
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
    return results;
}
export { executeQueryPurchase };
