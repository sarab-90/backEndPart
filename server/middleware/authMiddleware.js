import jwt from "jsonwebtoken";

// authincate middleware
export const protect = (req, res) =>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startswith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]; // extract token
    }
    if (!token){
        return res.status(401).json({message: "not authorized , no token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.User = decoded;
        next();

    } catch (error) {
        return res.status(400).json({message: "Invalid token"});
    }
}
//  protect comes after login and register