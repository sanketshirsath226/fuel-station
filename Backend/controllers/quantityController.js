
// import Order from "../models/order.js";

// export const addQuantity=async(req,res)=>{
//     const {quantity,id}=req.body;
//     let addquantity;
//     try {
//         addquantity=await Quantity.create({
//             quantity,
//             stationId:id
           
//         })

//         if(!addquantity){
//             return res.status(400).json({message:"Quantity is not added"})
//         }
//        await addquantity.save();
//        res.status(200).json(addquantity)
//     } catch (error) {
//         res.status(400).json(error)
//     }

// }

// export const getAvailableQuantity=async(req,res)=>{
//     const { id } = req.params;

//     try {
//         const addedQuantity = await Quantity.findOne({
//             where: {
//                 stationId: id,
//             },
//             attributes: [[sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']],
//         });

//         const orderedQuantity = await Order.findOne({
//             where: {
//                 stationId: id,
//                 status: 'fulfilled',
//             },
//             attributes: [[sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']],
//         });

//         const availableQuantity = addedQuantity.totalQuantity - orderedQuantity.totalQuantity;

//         res.status(200).json({ availableQuantity });
//     } catch (error) {
//         res.status(400).json(error);
//     }



// }
// export const updateQuantity=async(req,res)=>{

// }