export function getAllElementsQuery(tableName,columns) {
    const query = `SELECT ${columns} FROM optics.${tableName} where isActive=1 ;`;
    return query
}

export function getAllQuery(tableName,columns,filter) {
    const query = `SELECT ${columns} FROM optics.${tableName}  where isActive=1 LIMIT 10 OFFSET ${(filter._page - 1) *10};`;
    return query
}

export function getAllSortedQuery(tableName,columns,q,sortedKey) {
    const query = `SELECT ${columns} FROM optics.${tableName}  where isActive=1  ORDER BY ${sortedKey}  ;`;
    return query
}

export function getSortFromTwoTablesByTwoValues(tableName1,tableName2, value1,value2, columns,valueToCheck,filter) {
    const query = `SELECT ${columns} FROM optics.${tableName1} u INNER JOIN optics.${tableName2} p ON u.${value1}=p.${value2} WHERE p.${valueToCheck}= ? AND u.isActive=1 ORDER BY ${filter.sort} LIMIT ${(filter._page) * 10} OFFSET 0;`;
    return query
}

export function deleteQuery(tableName,value) {
    const query = `UPDATE optics.eyeglasses SET isActive =0 WHERE model = ?; `;
    return query
}

export function getFromTwoTablesByTwoValues(tableName1,tableName2, value1,value2, columns,valueToCheck,filter) {
    const query = `SELECT ${columns} FROM optics.${tableName1} u INNER JOIN optics.${tableName2} p ON u.${value1}=p.${value2} WHERE p.${valueToCheck}= ? AND u.isActive=1 LIMIT 10 OFFSET ${(filter._page - 1) * 10};`;
    return query;
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
    let condition = ""
    itemKeys.forEach(element => {
        condition += element + '='+"?" + " " + "AND"+" ";
    })
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${condition.slice(0, -4)} ;`;
    return query
}

export function getByValue(tableName, columns,itemKey) {
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE  isActive='1'  AND ${itemKey}=?;`;
    return query
}

export function getByValueQuery(tableName, value, columns) {
    const query = `SELECT ${columns} FROM optics.${tableName}  WHERE ${value} = ?`;
    return query
}
export function updateOneFieldQuery(tableName, value, columns) {
    const query = `UPDATE optics.${tableName} SET ${columns}=? WHERE  ${value} =? AND isActive = 1`
    return query;

}

export function getFromTwoTables(tableName1,tableName2, value, columns,valueToCheck) {
    const query = `SELECT ${columns} 
    FROM optics.${tableName1} u INNER JOIN optics.${tableName2} p 
    ON u.${value}=p.${value}
    WHERE p.${valueToCheck}= ?  ;`;
    return query;

}

export function updateQuery(tableName, value, itemKeys) {
    let keys = "";
    itemKeys.forEach((element, index) => {
        keys += element + ' = ? ';
        if (index < itemKeys.length - 1) {
            keys += ', ';
        }
    });
    const query = `UPDATE optics.${tableName} SET ${keys} WHERE ${value} = ? AND isActive = 1;`;
    return query;
}

export function updateSpecificFieldQuery(tableName, value, update) {
    const query=`UPDATE optics.${tableName} SET ${update}  AND active=1 WHERE ${value} = ? AND isActive = 1`;
    return query;
}



    
