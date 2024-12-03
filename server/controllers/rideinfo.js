import mongoose from "mongoose";
import rideInfoModel from "../models/rideInfoModel.js"
import driverModel from "../models/driverModel.js"
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

const postRide = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    const user = await driverModel.findOne({email});
    if(!user){
        return res.status(404).json({error: "User is not a driver"})
    }

    const driverEmail = email;
    const driver = user.name;

    const {dropoff, pickupPoint, pickupTimeHour, pickupTimeMinute, vehicle, maxPassengers} =  req.body

    try{
        const ride = await rideInfoModel.create({
            driverEmail,
            dropoff,
            pickupPoint,
            pickupTimeHour,
            pickupTimeMinute,
            driver,
            vehicle,
            maxPassengers
        });

        return res.status(200).json({message: "Ride Posted Successfully", ride})
    }catch (error){
        return res.status(400).json({ error: error.message });
    }
}

const getAllRides = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    var allRides;
    try{
        if(verifyToken(token, email)){
            const driver = await driverModel.findOne({email});
            if(driver){
                allRides = await rideInfoModel
                .find({ isFull: false, driverEmail: { $ne: driver.email } })
                .sort({ createdAt: -1 });
                return res.status(200).json({allRides})
            }
        }

        allRides = await rideInfoModel.find({isFull: false}).sort({createdAt: -1});
        return res.status(200).json({allRides})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const bookRide = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    const { _id } = req.body;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid Ride ID format" });
    }

    try {
        var ride = await rideInfoModel.findById(_id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if(ride.isFull){
            return res.status(409).json({message: "Ride is full"})
        }

        if (ride.currentPassengers.includes(email)) {
            return res.status(400).json({ message: "You are already booked for this ride" });
        }

        if(ride.currentPassengers.length+1 == ride.maxPassengers){
            ride = await rideInfoModel.findByIdAndUpdate(
                id,
                { 
                    isFull: true
                },
                { new: true }
            );
        }
        
        ride = await rideInfoModel.findByIdAndUpdate(
            _id, 
            { $push: { currentPassengers: email } },
            { new: true, runValidators: true } 
        );

        res.status(200).json({ message: "Ride booked successfully", ride });
    } catch (error) {
        res.status(500).json({ message: "Error booking ride", error: error.message });
    }
}

const completeRide = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    const { _id } = req.body;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid Ride ID format" });
    }

    try {
        var ride = await rideInfoModel.findById(_id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if(ride.driverEmail != email){
            return res.status(400).json({ message: "You do not own this ride"})
        }

        if(ride.currentPassengers.length < 1){
            return res.status(400).json({ message: "No passenger booked this ride"})
        }

        const updatedRide = await rideInfoModel.findByIdAndUpdate(
            _id, 
            { $set: { currentPassengers: [], isFull: false } },
            { new: true }
        );

        const completed = await completeRideModel.create({
            driverEmail: ride.driverEmail,
            driver: ride.driver,
            dropoff: ride.dropoff,
            pickup: ride.pickupPoint,
            passengers: ride.currentPassengers,
            completionDate: ride.updatedAt
        })

        res.status(200).json({ message: "Ride completed successfully", completed });
    } catch (error) {
        res.status(500).json({ message: "Error completing ride", error: error.message });
    }
}

const deleteRide = async (req, res) => {
    const token = req.cookies.token;
    const email = req.cookies.email;
    const { _id } = req.body;
    
    if(!verifyToken(token, email)){
        return res.status(400).json({message: "User is not logged in"})
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid Ride ID format" });
    }

    try {
        var ride = await rideInfoModel.findById(_id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if(ride.driverEmail != email){
            return res.status(400).json({ message: "You do not own this ride"})
        }

        ride = await rideInfoModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "Ride deleted successfully", ride });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ride", error: error.message });
    }
}

export {postRide, getAllRides, bookRide, completeRide, deleteRide}