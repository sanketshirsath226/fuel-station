import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup=async(req,res)=>{
    const {name,email,password,phone}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            return res.status(301).json({message:"User already exists with that email"})
        }

        const hashedPassword=await bcrypt.hash(password,12);

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
        
        })
        await newUser.save();
        if(newUser){
            return res.status(201).json({message:"User created successfully"});
        }
        
    } catch (error) {
        res.status(301).json(error)
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(301).json({ message: "User with that email is not exists" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(300).json({ message: "email and password are incorrect" });
        }
        const authtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
     
        res.status(200).json({ authtoken ,userId:user._id});
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getUserInfo = async (req,res) =>{
    try{
        const user = await User.findOne({_id:req.params.id})
        if(!user){
            return res.status(301).json({ message: "User does not exists" });
        }
        return res.status(201).json(user)
    }catch(error){
        res.status(400).json(error);
    }
}
export const changePassword = async (req,res) =>{
    const { password,newPassword,userId } = req.body;   
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User doesn't Exist" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (isValidPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);

            const updatedPassword = await User.updateOne({
                _id : userId
            },{
                $set : {
                    password : hashedPassword
                }
            })
            
            if(!updatedPassword){
                return res.status(400).json({ message: "Updating Failure" })
            }
            return res.status(200).json({ message: "Password Updated Successfully" })
        }else{
            return res.status(400).json({ message: "Current Password not matching" })
        }

    } catch (error) {
        res.status(400).json(error)
    }
}