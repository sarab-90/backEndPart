import User from "../models/Users.js";
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    const {name,email,password} = req.body;

    try {
        //bcrypt password : تشفير كلمة المرور قبل تخزينها في قاعدة البيانات
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,email,password:hashedPassword
        })
        res.status(201).json({
            user:user
        })
        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        
    }

}
export const loginUser = async(req,res) =>{
    const {email,password} = req.body;

    try {
        const user =await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if (user && isPasswordCorrect){
            res.status(200).json({user:user, message:"login Successful"})
        }
        else{
            res.status(401).json({message:"Invalid Credentials email or password is incorrect"})
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getAllUsers = async(req,res) =>{
    try {
        const users = await User.find({});
        res.status(200).json({users:users})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// search users by name or email and id 

export const searchUsers = async(req,res) =>{
    const {name, email, id} = req.body;

    
    try {
        const users = await User.find({name:name},{email:email},{_id:id});
        if (users.length < 1){
            res.status(404).json({message:"No users found"})
        }
        res.status(200).json({users:users})        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteUser = async(req,res) =>{
    const {id} = req.params;

    try {
        const userToDelete = await User.findByIdAndDelete(id);
        if (!userToDelete){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const updateUser = async(req,res) =>{
    const {id} = req.params;
    const {name, email} = req.body;

    try {
        const userToUpdate = await User.findByIdAndUpdate(id,{name,email},{new:true});
        if (!userToUpdate){
            return res.status(404).json({message:"User not found"})
        }        
        res.status(200).json({user:userToUpdate})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}