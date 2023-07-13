import express from "express";
import {signup,login,getUserInfo, changePassword} from "../controllers/userController.js"

const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.put('/changePassword',changePassword)

router.get('/getUserInfo/:id',getUserInfo)
export default router;