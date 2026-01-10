import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:true,
            trim: true
        },
        email:{
            type: String, 
            required: true, 
            unique: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type:String, 
            required:true
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {
        timestamps:true,
    }
);
const User = mongoose.model('users',userSchema)

export default User