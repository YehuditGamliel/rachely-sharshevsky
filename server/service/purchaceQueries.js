export function getAllFromStatusAndPueches( columns) {
    // const query = updateOneFieldQuery('purchase', 'id', itemDetails);
    // const result = await executeQuery(query, [value]);
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.status s
    ON p.status=s.id
    WHERE s.isActive=1 AND p.isActive=1  ;`;
    console.log(query)
    return query;

}

export function getFromPurchaseAndUsers( columns,valueCheck) {
    // const query = updateOneFieldQuery('purchase', 'id', itemDetails)users', 'purchase', 'userName', 'email', 'id';
    // const result = await executeQuery(query, [value]);
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.users u
    ON p.userName=u.userName
    WHERE p.isActive=1 AND ${valueCheck}=? ;`;
    console.log(query)
    return query;

}