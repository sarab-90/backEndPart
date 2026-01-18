import User from "../models/users.Models.js";
// hashing password
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register logic
export const register = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    try {
        if (!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        // تأكد من اذا email موجود او لا 
        const  existingUser = await User.findOne({email});
        // confirmation password check
        if (password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }
        if (existingUser){
            return res.status(409).json({message: "User already exists, Try to login"});
        }
        // cheak if password length more than 8 character
        if (password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }

        // cheak if password contains at least one number and one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/; // regex
        if (!passwordRegex.test(password)){
            return res.status(400).json({message: "Password must contain at least one number and one special character"});
        }

        const hashPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        const newUser = await User.create({name, email, password: hashPassword , role:"user"});
        
        return res.status(201).json({message: "User registered successfully", User:newUser})
    
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

// login logic with jwt
export const login = async (req, res) => {
    const {email, password} =req.body;
    try {
        if (!email || !password){
            return res.status(400).json({message: "All fields are requied"});
        }
        const existingUser = await User.findOne({email});

        if (!existingUser){
            return res.status(404).json({message: "User not found, Please register"});
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid){
            return res.status(401).json({message: "email or password are incorrect, please try again "});
        }

        // generate jwt token 
        const token = jwt.sign(
            {id: existingUser._id, email: existingUser.email, role: existingUser.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        // تخزين token في >> cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // = false in development
            sameSite: "strict",
            maxAge: 3600000 // = 1 hour
        });

        return res.status(200).json({message: "Login successfull", User:existingUser, token})
    
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

// get current user 
export const getCurrentUser = async (req, res) => {
    // get current user from the id in the tokens
    try {
        const currentUser = await User.findById(req.User.id).select("-password");
        console.log("Current User: ", currentUser); // debugging line > تصحيح الخطأ
        if (!currentUser){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({User: currentUser});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

// logout logic
export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0) 
    });
    return res.status(200).json({message: "Logout successful"});
}