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
    const query = `SELECT ${columns} FROM optics.${tableName}   ORDER BY ${sortedKey};`;
     console.log(query)
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
}
export function deleteQuery(tableName) {
    console.log("❤️❤️❤️")
    const query = ` UPDATE optics.eyeglasses SET isActive =0 WHERE model = ${model} AND isActive =1; `;
    return query
    
}

// export function  addaspecialQuery(tableName,itemKeys){
//     let keys = "", QuestionMark = "";
//     itemKeys.forEach(element => {
//         keys += element + ',';
//         QuestionMark += "?,"
//     })
//     const query = `INSERT INTO optics.${tableName} (${keys}) VALUES (${QuestionMark});`;
//     console.log(query)
//     return query
// }
export function addQuery(tableName, itemKeys)   {
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    
    const query = `INSERT INTO optics.${tableName} (${keys.slice(0, -1)}) VALUES (${QuestionMark.slice(0, -1)});`;
   console.log(query)
    return query
}

//('optics','hashPassword','userName')
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
export function getByValue(tableName, columns,itemKey) {
   
   //const query = `SELECT email FROM optics.manager  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
//    console.log("🥻",query)
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${itemKey}=?;`;
    console.log(query)
    return query
}

export function getByValueQuery(tableName, value, columns) {
    console.log(tableName, value, columns)
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    // const query=` SELECT email FROM optics.users where userName='Yehudit';`
    console.log(query)
    return query
}
export function updateOneFieldQuery(tableName, value, columns) {
    // const query = updateOneFieldQuery('purchase', 'id', itemDetails);
    // const result = await executeQuery(query, [value]);
    const query = `UPDATE optics.purchase SET ${columns}=? WHERE  ${value} =? AND isActive = 1`;
    // const query=`UPDATE optics.${tableName} SET active=1 WHERE ${value} = 'Yehudit' AND isActive = 1`;
    console.log( query);
    return query;

}
export function getFromTwoTables(tableName1,tableName2, value, columns,valueToCheck) {
    // const query = updateOneFieldQuery('purchase', 'id', itemDetails);
    // const result = await executeQuery(query, [value]);
    const query = `SELECT ${columns} 
    FROM optics.${tableName1} u INNER JOIN optics.${tableName2} p 
    ON u.${value}=p.${value}
    WHERE ${valueToCheck}= ?  AND u.isActive=1;`;

    console.log( query);
    return query;

}

export function addPurchaseQuery(columnsPurchase,columnsEyeData, date, status){
    const queries = [
            { query: `INSERT INTO eyesdata (${columnsEyeData}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`},
            { query: `INSERT INTO purchase (${columnsPurchase}) VALUES (?, ${date},?, ${status},?, ?)`},
            
        ];
        return queries;
}



export function updateQuery(tableName, value, itemKeys) {
    console.log("🤣",itemKeys);
    console.log(tableName, value, itemKeys)
    let keys = "";
    itemKeys.forEach((element, index) => {
        keys += element + ' = ? ';
        if (index < itemKeys.length - 1) {
            keys += ', ';
        }
    });
    const query = `UPDATE optics.${tableName} SET ${keys} WHERE ${value} = ? AND isActive = 1`;
    // const query=`UPDATE optics.${tableName} SET active=1 WHERE ${value} = 'Yehudit' AND isActive = 1`;
    console.log( query);
    return query;
}
export function updateSpecificFieldQuery(tableName, value, update) {
   
    // const query = `UPDATE optics.${tableName} SET ${keys} WHERE ${value} = ? AND isActive = 1`;
    const query=`UPDATE optics.${tableName} SET${update} active=1 WHERE ${value} = ? AND isActive = 1`;
    console.log( query);
    return query;}






