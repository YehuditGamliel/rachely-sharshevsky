export function getAllQuery(tableName,columns) {
    console.log("qrey")
    const query = `SELECT ${columns} FROM ${tableName} `;
    console.log(query)
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
// export function getByValueQuery(tableName,limit, value, columns) {
//     const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId=? AND ${value} = ? AND isActive =1
//     LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
//     return query
// }

export function addQuery(tableName, itemKeys) {
    console.log(itemKeys)
  
    // let keys = "", QuestionMark = "";
    // itemKeys.forEach(element => {
    //     console.log(element)
    //     keys += element + ',';
    //     QuestionMark += "?,"
    // })model,price,photo,p
    //keys.slice(0, -1)
    console.log(itemKeys,QuestionMark);
    //const query = `INSERT INTO ${tableName} (${itemKeys}) VALUES (${QuestionMark.slice(0, -1)})`
    const query=`INSERT INTO optics.eyeglasses (model,price,photo,p)
    VALUES ("77444ppw",400,"pp.fpg",50);`;
    
    console.log(query);
    return query
}
export function getByValueQuery(tableName, value, columns) {
    const query = `SELECT ${columns} FROM ${tableName}  WHERE ${value} = ?`;
    console.log(query)
    return query
}
// export function getByValueQuery(tableName, columns) {
//     const query = `SELECT ${columns} FROM optics.${tableName}  WHERE id= ? AND isActive =1`;
//     return query
// }
export function getByTitleQuery(tableName, limit, value, columns) {
    const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId=? AND title LIKE "${value}%" 
    LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
    return query
}

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
    const query = `SELECT u.id, u.userName,u.email 
    FROM project.users u INNER JOIN project.passwords p 
    ON u.id=p.userId
    WHERE userName= ? AND password = ? AND u.isActive=1;`;
    return query
}
export function checkUserId(){
   const query= `SELECT id FROM project.users
    WHERE userName=?;`
    return query;
}


