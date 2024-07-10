export function getAllFromStatusAndPueches(columns) {
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.status s
    ON p.status=s.id
    WHERE s.isActive=1 AND p.isActive=1  ;`;
    return query;

}
export function getAllortedFromdPuechesByStatus(columns, status) {
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.status s
    ON p.status=s.id
    WHERE s.isActive=1 AND p.isActive=1 AND ${status}=?;  ;`;
    return query;

}

export function getFromPurchaseAndUsers(columns, valueCheck) {
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.users u
    ON p.userName=u.userName
    WHERE p.isActive=1 AND p.${valueCheck}=? ;`;
    return query;
}
export function getFromPurchaseAndEyeData(columns, valueCheck) {
    const query = `SELECT ${columns} 
    FROM optics.purchase p INNER JOIN optics.eyesData e
    ON p.idEyeData=e.id
    WHERE p.isActive=1 AND p.${valueCheck}=? ;`;
    return query;
}
export function getStatusFromStatusSchema() {
    const query = `SELECT title
    FROM optics.purchase p INNER JOIN optics.status s
    ON p.status=s.id AND p.userName=? AND p.idEyeData=? 
    WHERE s.isActive=1 AND p.isActive=1  ;`;
    return query;
}

export function getFromPurchaseAndUsersAndRole(columns, valueCheck) {
   const query = `SELECT ${columns} 
   FROM optics.purchase p
   INNER JOIN optics.users u ON p.userName = u.userName
   INNER JOIN optics.roles r  ON r.id = p.status
   WHERE p.isActive = 1 AND p.${valueCheck} = ?; `;
   return query;
}