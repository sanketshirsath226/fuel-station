import express from "express";
import { initOrder, verifyOrder } from "../controllers/paymentController.js";

const router=express.Router();

router.post("/order", initOrder);
router.post('/verify',verifyOrder);

export default router;