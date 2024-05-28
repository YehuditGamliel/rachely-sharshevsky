import mysql from 'mysql2/promise';
import 'dotenv/config'


async function executeQuery(query, params){
    let results;
 
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        //port: 8080,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD,
    });

    try {
        console.log("params"+params)
        [results] = await connection.execute(query,params);
        
    } catch (err) {
        //console.log(err);
    }
    finally {
        connection.end();
    }
    console.log("results:"+results);
    return results;
}

export{
    executeQuery
}