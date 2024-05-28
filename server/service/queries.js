export function addQuery(tableName, itemKeys) {
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    const query = `INSERT INTO optics.${tableName} (${keys.slice(0, -1)}) VALUES (${QuestionMark.slice(0, -1)});`;
    console.log(query);
    return query
}

export function getUserByEmailQuery() {
    const query = `SELECT * FROM optics.users where email=? and password=?;`;
    console.log(query)
    return query
}
export function vv(){
    const query = 'select * from optics.users;'
    return query;
}





/////////////
export function getByValueQuery(tableName, value, columns) {
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    console.log(query)
    return query
}
// export function getByValueQuery(tableName, columns) {
//     const query = `SELECT ${columns} FROM optics.${tableName}  WHERE id= ? AND isActive =1`;
//     return query
// }

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




