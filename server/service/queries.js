
export function getAllQuery(tableName,columns) {
    const query = `SELECT ${columns} FROM optics.${tableName} `;
    return query
    //LIMIT ${limit[0]} , ${limit[1] - limit[0]}
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
    console.log(tableName, columns,itemKeys)
    let condition = ""
    itemKeys.forEach(element => {
        condition += element + '='+"?" + " " + "AND"+" ";
    })
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
    console.log(query)
    return query
}

export function getByValueQuery(tableName, value, columns) {
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    return query
}

export function addPurchaseQuery(columnsPurchase,columnsEyeData, date, status){
    const queries = [
            { query: `INSERT INTO purchase (${columnsPurchase}) VALUES (?, ${date},?, ${status},?, ?)`},
            { query: `INSERT INTO eyesdata (${columnsEyeData}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`},
        ];
        return queries;
}





