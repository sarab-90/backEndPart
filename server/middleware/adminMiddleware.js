export const adminOnly =  async (req, res) =>{
    if (req.User && req.role === "admin"){
        next();
    } else{
        return res.status(403).json({message: "Access denied, admin only"});
    }
}