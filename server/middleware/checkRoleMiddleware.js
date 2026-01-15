// read role and check access
export const checkRole = (allowedRole) =>{
    return async (req, res, next) => {
        if (req.User && allowedRole.includes(req.User.role)) {
            //console.log(${req.User.role})
            next();
        } else{
            return res.status(403).json({message: "Access denied"});
        }
    }
}
