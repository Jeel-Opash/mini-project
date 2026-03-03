
import mongoose from "mongoose";

interface IUser extends mongoose.Document{
    name:string;
    email:string;
    password:string;
};

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
       
    },
},{
    timestamps:true
})

const User= mongoose.model<IUser>('User',userSchema);

export default User;