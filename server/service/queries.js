export function getAllQuery(tableName,columns) {
    console.log("qrey")
    const query = `SELECT ${columns} FROM optics.${tableName} `;
    console.log(query)
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
// export function getByValueQuery(tableName,limit, value, columns) {
//     const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId=? AND ${value} = ? AND isActive =1
//     LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
//     return query
// }
// function getAllQuery(query, table) {
//     var queryStr = "";
//     // if (query._page != undefined)
//     //     queryStr = `SELECT * FROM ${table} LIMIT 5 OFFSET ${(query._page - 1) * 5}; `;
//     //else if(query._page!)
//     // else {
//     const whereConditions = Object.keys(query).map((key) => {
//         if (key != "_page")
//             return `${key} = '${(query[key])}'`;
//     });
//     queryStr = `
//       SELECT *
//       FROM ${table}
//       WHERE ${whereConditions.join(" AND ")}
//       1=1
//       LIMIT 5 OFFSET ${(query._page - 1) * 5};
//       `;
//     // }
//     return queryStr
// }
export function getUserByEmailQuery() {
    const query = `SELECT * FROM optics.users where email=? and password=?;`;
    console.log(query)
    return query
}

export function addQuery(tableName, itemKeys)   {
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    const query = `INSERT INTO optics.${tableName} (${keys.slice(0, -1)}) VALUES (${QuestionMark.slice(0, -1)});`;
    console.log(query);
    return query
}

export function getByValues(tableName, columns,itemKeys) {
    console.log(tableName, columns,itemKeys)
    let condition = ""
    itemKeys.forEach(element => {
        console.log(element)
        condition += element + '='+"?" + " " + "AND"+" ";
       
        
    })
    console.log(condition)
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
   
    console.log(query);
    return query
}
export function getByValueQuery(tableName, value, columns) {
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    console.log(query)
    return query
}
// export function getByValueQuery(tableName, columns) {
//     const query = `SELECT ${columns} FROM optics.${tableName}  WHERE id= ? AND isActive =1`;
//     return query
// }
// export function getByTitleQuery(tableName, limit, value, columns) {
//     const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId=? AND title LIKE "${value}%" 
//     LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
//     return query
// }

export function sortedQuery(tableName, limit, sortedKey, columns) {
    const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId= ? AND isActive =1 ORDER BY ${sortedKey}
      LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
    return query
}
export function deleteQuery(tableName) {
    const query = `UPDATE project.${tableName} SET isActive =0 WHERE id = ? AND isActive =1 `;
    return query
}
export function updateQuery(tableName,value, itemKeys) {
    let keys = "";
    itemKeys.forEach(element => {
        keys += `${element} = ?,`;
    })
    const query = `UPDATE project.${tableName} SET ${keys.slice(0, -1)} WHERE ${value} =? AND isActive =1 `;
    return query
}

export function AuthenticationQuery() {
    const query = `SELECT userName 
    FROM optics.users 
    WHERE email= ? AND password = ? AND u.isActive=1;`;
    return query
}
export function checkUserId(){
   const query= `SELECT id FROM project.users
    WHERE userName=?;`
    return query;
}


