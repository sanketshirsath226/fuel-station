import mongoose from 'mongoose';



const orderSchema = mongoose.Schema({
    address: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    fuel: {
        petrol: {
            price: { type: Number },
            quantity: { type: Number }
        },
        diesel: {
            price: { type: Number },
            quantity: { type: Number }
        }
    },

    method: {
        cash: { type: Number },
        online: {
            transactionID: {
                type: String
            },
            status: {
                type: String
            },
            amount:{
                type : Number
            }
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
       
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        

    },
    isCanceled: {
       status:{type:Boolean}      
    },
    isAccepted: {
        status: { type: Boolean }
    },
    isDelivered: {
        status: { type: Boolean },
        message: { type: String }

    },



})

export default mongoose.model("Order", orderSchema)