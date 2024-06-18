import mysql from 'mysql2/promise';
import 'dotenv/config'

async function executeQuery(query, params){
    let results;
    let val;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        //port: 8080,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD,
    });

    try {
        // console.log("query",query[0])
        // console.log("params",params)
        [results] = await connection.execute(query,params);
    
        // Begin transaction

    //    [val] = await connection.beginTransaction();



        // Execute all queries
        // for (const { query, params } of query) {
        //     console.log("?")
        //     [results] = await connection.query(query, params);
        // }
        // Commit the transaction
        // for(let i = 0 ; i < query.length ;i++){
        //     val = query[i];
        //     console.log("val",val)
        //     console.log(await connection.query(query,params));
        //     console.log("aa",aa)
        // }


        await connection.commit();

        
    } catch (err) {
        await connection.rollback();
        // console.log(err);
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}


// const mysql = require('mysql2/promise');

// async function executeQueries(queries) {
//     // Establish connection to your MySQL database
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'your_username',
//         password: 'your_password',
//         database: 'your_database'
//     });

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Execute all queries
//         for (const { query, values } of queries) {
//             await connection.query(query, values);
//         }

//         // Commit the transaction
//         await connection.commit();
//         console.log('Transaction committed successfully.');
//     } catch (error) {
//         // If any error occurs, rollback the transaction
//         await connection.rollback();
//         console.error('Error occurred, transaction rolled back:', error);
//     } finally {
//         // Close the connection
//         connection.end();
//     }
// }

// // Example usage
// const queries = [
//     { query: 'INSERT INTO table1 (column1, column2) VALUES (?, ?)', values: [value1, value2] },
//     { query: 'INSERT INTO table2 (column3, column4) VALUES (?, ?)', values: [value3, value4] },
//     { query: 'INSERT INTO table3 (column5, column6) VALUES (?, ?)', values: [value5, value6] }
// ];

// // Call the function to execute the queries
// executeQueries(queries);


