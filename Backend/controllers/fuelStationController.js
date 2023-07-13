import Station from "../models/fuelStation.js";
//import Quantity from "../models/quantity.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const registerStation = async (req, res) => {
    const { name, owner, email, password, location, phone } = req.body;
    const { lat, long } = location;
    try {
        const registeredUser = await Station.findOne({
            email
        })
        if (registeredUser) {
            return res.status(400).json({ message: "Already registered" })
        }

        const usedLocation = await Station.findOne({
            "location.lat": lat, "location.long": long
        })
        
        if (usedLocation) {
            return res.status(400).json({ message: "Location already added" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newRegisteredUser = await Station.create({
            name,
            owner,
            email,
            password: hashedPassword,
            location,
            phone,
            quantity:{
                petrol: {
                    price: 0,
                    quantity: 0
                },
                diesel: {
                    price: 0,
                    quantity: 0
                }
            }
        })

        await newRegisteredUser.save();
        if (newRegisteredUser) {
            res.status(201).json({ message: "Registered successfully" })
        }


    } catch (error) {
        res.status(400).json(error)
    }
}

export const loginStation = async (req, res) => {
    const { email, password } = req.body;
    let loginUser;
    let token;
   
    try {
        loginUser = await Station.findOne({ email });

        if (!loginUser) {
            return res.status(301).json({ message: "Station with that email does not exists" })
        }

        const isValidPassword = await bcrypt.compare(password, loginUser.password)
        if (!isValidPassword) {
            return res.status(300).json({ message: "email and password are incorrect" });
        }
        token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET);
        res.status(200).json({token ,stationId:loginUser._id})

    } catch (error) {
        res.status(400).json(error)
    }


}

export const updateFuel = async (req,res) =>{
    const { quantity,stationId } = req.body;   
    try {
        const user = await Station.findById(stationId);

        if (!user) {
            return res.status(400).json({ message: "User doesn't Exist" })
        }
            const updatedUser = await Station.updateOne({
                _id : stationId
            },{
                $set : {
                    quantity : quantity
                }
            })
            
            if(!updatedUser){
                return res.status(400).json({ message: "Updating Failure" })
            }
            return res.status(200).json({ message: "Updated Successfully" })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const changePassword = async (req,res) =>{
    const { password,newPassword,stationId } = req.body;   
    try {
        const user = await Station.findById(stationId);

        if (!user) {
            return res.status(400).json({ message: "User doesn't Exist" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (isValidPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);

            const updatedPassword = await Station.updateOne({
                _id : stationId
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


export const getFuelStations = async (req, res) => {
    let stations;
    try {
        stations=await Station.find({})
        if (!stations) {
            return res.status(400).json({ message: "Stations not found" })
        }

        res.status(200).json({stations});
    } catch (error) {
        console.log(error,"err")
        res.status(400).json(error)
        
    }
}

export const getStationWithId = async (req, res) => {
    let station;
    try {
        station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(400).json({ message: "Station with that id does not exists" })
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(400).json(error)
    }
}