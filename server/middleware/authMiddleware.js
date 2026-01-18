import jwt from "jsonwebtoken";
// authincate middleware
export const protect = (req, res, next) => {
  // cookies is existed in https
  let token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "no token provided, authorization denied" });
  }
  // token = in postman > headers > key = Anuthorization , value = Bearer ..........

  try {
    //فك التشفير
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.User = decoded;
    // console.log("Decoded User: ", decoded); // debugging line > تصحيح الخطأ
    console.log("Decoded User2: ", req.User); // debugging line > تصحيح الخطأ
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
//  protect comes after login and register
