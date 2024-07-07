import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.query.token || req.headers.cookie?.split('; ').find(cookie => cookie.startsWith('x-access-token')).split('=')[1] || req.cookies['x-access-token'];

    console.log("token",token)
    if (!token)
        return res.sendStatus(403).send("not access Token");
    try {
            const verified = jwt.verify(token, "privateKey");
            if (!verified) {
                return res.status(401).send("Invalid Token");
            }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

