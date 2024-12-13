import mysql from 'mysql2/promise';
import 'dotenv/config'


async function executeQuery(query, params){
    let results;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port:8080,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });

    try {
        [results] = await connection.execute(query,params);
    } catch (err) {
       throw(err)
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}




// import mysql from 'mysql2/promise';
// import 'dotenv/config';

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     //port:8080,
//     database: process.env.DB_NAME,
//     password: process.env.PASSWORD,
// });

// async function executeQuery(query, params) {
//     let connection;
//     let results;
//     try {
//         connection = await pool.getConnection();
//         await connection.beginTransaction();
//         if(query[0].query != undefined){
//             console.log("params",params[0],params[1])
//          for (let i = 0; i < query.length; i++) {
//             [results] = await connection.query(query[i].query, Object.values(params[i]));
//             console.log(results)
//          }
//         }
//         else{
            
//             [results] = await connection.execute(query,params);
//         }
        
//         await connection.commit();
//     } catch (error) {
//         if (connection) {
//             await connection.rollback();
//         }
//         throw error;
//     } finally {
//         if (connection) {
//             connection.release();
//         }
//     }
//     return results;
// }
// export { executeQuery };





