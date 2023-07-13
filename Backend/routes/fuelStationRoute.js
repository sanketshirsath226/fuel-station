import express from "express";
import {  changePassword, getFuelStations, getStationWithId, loginStation, registerStation, updateFuel } from "../controllers/fuelStationController.js";
import { verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.post('/register',registerStation);
router.post('/login',loginStation)
router.put('/changePassword',changePassword);
router.put('/updateFuel',updateFuel);
router.get('/getStations',getFuelStations);
router.get('/:id', getStationWithId)
export default router;