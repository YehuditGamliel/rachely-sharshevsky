import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req?.query?.token || req?.headers?.cookies["x-access-token"] || req?.cookies?.token;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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

