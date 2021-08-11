import jwt from "jsonwebtoken";

const verifyToken = (req: any, res: any, next: any) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(
            token,
            "c4b7a440-65a2-4ac4-a835-64131ac5f095"
        );
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;
