import userModel from "../models/userModel.js";
import rideInfoModel from "../models/rideInfoModel.js"
import driverModel from "../models/driverModel.js";
import completeRideModel from "../models/completeRideModel.js";
import jwt from "jsonwebtoken"

const verifyToken = (token, email) => {
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== email) {
            return false;
        } else return true;
    } else return false;
}

const getUserProfile = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;

    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    try {
        const user = await userModel.findOne({email});
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getDriverRides = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    var driverRides;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    try{
        const driver = await driverModel.findOne({email});

        if(driver){
            driverRides = await rideInfoModel
            .find({driverEmail: email })
            .sort({ createdAt: -1 });
            return res.status(200).json({driverRides})

        }else {
            return res.status(400).json({message: "User is not a driver"});
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getPastRides = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;

    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }
    
    try {
        const pastRides = await completeRideModel
        .find({passengers: { $elemMatch: { $eq: email } }})
        .sort({ createdAt: -1 });

        return res.status(200).json({pastRides})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const rateDriver = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    const { _id, driverEmail, rating } = req.body;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating. Must be between 1 and 5." });
    }

    try {
        var driver = await driverModel.findOne({email:driverEmail});
        if(driver){
            var total = driver.driverRating * driver.reviewCount
            total = total + rating;
            const newCount = driver.reviewCount + 1;
            const newRating = total/newCount;
            driver = await driverModel.findOneAndUpdate(
                {email:driverEmail},
                {
                    driverRating: newRating,
                    reviewCount: newCount
                },
                { new: true });
            const cR = await completeRideModel.findByIdAndUpdate(
                _id,
                { $pull: { passengers: email } },
                { new: true }
            );

            if(cR.passengers && cR.passengers.length === 0){
                const v = await completeRideModel.findByIdAndDelete(_id)
            }

            return res.status(200).json({message: "Rating successful", cR})
        }else{
            const v = await completeRideModel.findByIdAndDelete(_id)
            return res.status(404).json({message: "There is no such driver"});
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const editProfile = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    const { name, driverBool, DepCourse, usualRoute, usualSched } = req.body;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"});
    }

    try {
        const user = await userModel.findOne({email});
        const oldDB = user.driverBool;
        const newUser = await userModel.findOneAndUpdate(
            { email },
            { name, driverBool, DepCourse, usualRoute, usualSched },
            { new: true }
        );
        const newDB = newUser.driverBool;

        if (oldDB === true && newDB === false) {
            await rideInfoModel.deleteMany({ driverEmail: email });
            await driverModel.findOneAndUpdate({ email }, {name: newUser.name});
        } else if (oldDB === false && newDB === true) {
            let driver = await driverModel.findOne({ email });
            if (!driver) {
                driver = await driverModel.create({
                    email,
                    name: newUser.name,
                    driverRating: 0,
                    reviewCount: 0, 
                });
            }
        } else if (oldDB && newDB) {
            await driverModel.findOneAndUpdate(
                { email },
                { name: newUser.name },
                { new: true }
            );
            await rideInfoModel.updateMany(
                { driverEmail: email },
                { $set: { driver: newUser.name } }
            );
        }

        return res.status(200).json({ message: "Profile updated successfully", user: newUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


export {getUserProfile, getDriverRides, getPastRides, rateDriver, editProfile};