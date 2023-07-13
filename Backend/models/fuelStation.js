import mongoose from "mongoose";

const fuelSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:{
            lat:{type:Number},
            lng:{type:Number}
        },
        unique:true
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
    },
    quantity:{
        petrol:{
            price:{type:Number},
            quantity: { type: Number }
        },
        diesel: {
            price: { type: Number },
            quantity: { type: Number }
        }
    }
})

export default mongoose.model("Station",fuelSchema);