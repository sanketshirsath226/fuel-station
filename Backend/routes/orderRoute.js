import express from "express";
import { acceptOrder, addOrder,getOrderByUserId, cancleOrder, deliveryOrder, getOrders,getOrderByFuelStationId} from "../controllers/orderController.js";
//import { verifyToken } from "../middleware/auth.js";
const router=express.Router();

router.route('/')
    .post(addOrder)
    .get(getOrders)

router.get('/getOrderByFuelStationId/:id',getOrderByFuelStationId);
router.get('/getOrderByUserId/:id',getOrderByUserId);

// router.route('/:id')
//     .put(verifyToken, updateOrder)
// router.route('/:id')
//     .get(verifyToken, getOrderById)

router.put('/cancel',cancleOrder);
router.put('/accept',acceptOrder);
router.put('/deliever',deliveryOrder);

export default router;