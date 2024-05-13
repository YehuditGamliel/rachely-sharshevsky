export function getAllQuery(tableName,columns) {
    console.log("qrey")
    const query = `SELECT ${columns} FROM optics.${tableName} WHERE  isActive =1`;
    console.log(query)
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
// export function getByValueQuery(tableName,limit, value, columns) {
//     const query = `SELECT ${columns} FROM project.${tableName}  WHERE userId=? AND ${value} = ? AND isActive =1
//     LIMIT ${limit[0]} , ${limit[1] - limit[0]}`;
//     return query
// }
export function getByValueQuery(tableName) {
    const query = `select  * from optics.eyeglasses; ` ;

    return query
}
export function deleteQuery(tableName) {
    const query = `UPDATE optics${tableName} SET isActive =0 WHERE id = ? AND isActive =1 `;
    return query
}
export function addQuery(tableName, itemKeys) {
    //console.log(itemKeys,'?')
  
    // let keys = "", QuestionMark = "";
    // itemKeys.forEach(element => {
    //     console.log(element)
    //     keys += element + ',';
    //     QuestionMark += "?,"
    // })model,price,photo,p
    //keys.slice(0, -1)
    //console.log(itemKeys,QuestionMark);
    const query = `INSERT INTO optics.${tableName} (${itemKeys}) VALUES ("544422",40000000000000,"p.fpg",0)`
    // const query=`INSERT INTO optics.eyeglasses (model,price,photo,p)
    // VALUES ("77444ppw",400,"pp.fpg",50);`;
    //const query = `select  * from optics.eyeglasses; ` ;
    console.log(query);
    return query
}
export function getByIdQuery(tableName, columns) {
    console.log("sadadas")
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE id= ? AND isActive =1`;
    return query
}
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

export function updateQuery(tableName,value, data) {

    const query = `UPDATE optics.${tableName} SET ${data} WHERE ${value} =? AND isActive =1 `;
    console.log(query)
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


