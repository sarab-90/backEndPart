export const adminOnly =  async (req, res, next) =>{
    if (req.User && req.User.role === "admin"){
        console.log(req.User.role);
        next();
    } else{
        return res.status(403).json({message: "Access denied, admin only"});
    }
}