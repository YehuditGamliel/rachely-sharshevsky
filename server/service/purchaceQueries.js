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
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.users u
    ON p.userName=u.userName
    WHERE p.isActive=1 AND p.${valueCheck}=? ;`;
    console.log(query)
    return query;
}

export function getFromPurchaseAndUsersAndRole( columns,valueCheck) {
    const query = `SELECT ${columns} 
   FROM optics.purchase p
INNER JOIN optics.users u ON p.userName = u.userName
INNER JOIN optics.roles r  ON r.id = p.status
WHERE p.isActive = 1 AND p.${valueCheck} = ?; `;
    console.log(query)
    return query;
}