//IsActive to add to every one
export function getAllElementsQuery(tableName,columns) {
    const query = `SELECT ${columns} FROM optics.${tableName} ;`;
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
export function getAllQuery(tableName,columns,q) {
    const query = `SELECT ${columns} FROM optics.${tableName} LIMIT 5 OFFSET ${(q._page - 1) * 5};`;
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
//ORDER BY ${sortedKey}
export function getAllSortedQuery(tableName,columns,q,sortedKey) {
    const query = `SELECT ${columns} FROM optics.${tableName} LIMIT 5 OFFSET ${(q._page - 1) * 5} ;`;
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
export function deleteQuery(tableName) {
    console.log("❤️❤️❤️")
    const query = ` UPDATE optics.eyeglasses SET isActive =0 WHERE model = ${model} AND isActive =1; `;
    return query
    
}

export function  addaspecialQuery(tableName,itemKeys,inadditional){
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    const query = `INSERT INTO optics.${tableName} (${keys}${inadditional}) VALUES (${QuestionMark} ?);`;
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
    return query
}

export function getByValues(tableName, columns,itemKeys) {
    // console.log(itemKeys)
    let condition = ""
    itemKeys.forEach(element => {
        condition += element + '='+"?" + " " + "AND"+" ";
    })
   //const query = `SELECT email FROM optics.manager  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
//    console.log("🥻",query)
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
    console.log("🥻",query)
    return query
}

export function getByValueQuery(tableName, value, columns) {
    console.log(tableName, value, columns)
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    // const query=` SELECT email FROM optics.users where userName='Yehudit';`
    console.log(query)
    return query
}

export function addPurchaseQuery(columnsPurchase,columnsEyeData, date, status){
    const queries = [
            { query: `INSERT INTO purchase (${columnsPurchase}) VALUES (?, ${date},?, ${status},?, ?)`},
            { query: `INSERT INTO eyesdata (${columnsEyeData}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`},
        ];
        return queries;
}
export function updateQuery(tableName, value, itemKeys) {
    console.log("🤣");
    console.log(tableName, value, itemKeys)
    let keys = "";
    itemKeys.forEach((element, index) => {
        keys += element + ' = ? ';
        if (index < itemKeys.length - 1) {
            keys += ', ';
        }
    });
    // const query = `UPDATE optics.${tableName} SET ${keys} WHERE ${value} = ? AND isActive = 1`;
    const query=`UPDATE optics.${tableName} SET active=1 WHERE ${value} = 'Yehudit' AND isActive = 1`;
    console.log( query);
    return query;
}
export function updateSpecificFieldQuery(tableName, value, update) {
   
    // const query = `UPDATE optics.${tableName} SET ${keys} WHERE ${value} = ? AND isActive = 1`;
    const query=`UPDATE optics.${tableName} SET${update} active=1 WHERE ${value} = ? AND isActive = 1`;
    console.log( query);
    return query;}





