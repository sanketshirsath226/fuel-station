import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    isValid:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("User",userSchema)