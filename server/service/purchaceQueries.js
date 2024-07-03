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