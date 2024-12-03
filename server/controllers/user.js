import userModel from "../models/userModel.js";
import driverModel from "../models/driverModel.js";
import completeRideModel from "../models/completeRideModel.js";

const rateDriver = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }
}

const editProfile = async (req, res) => {
    
}

export {rateDriver, editProfile};