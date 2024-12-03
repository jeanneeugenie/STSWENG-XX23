import mongoose from "mongoose";
import rideInfoModel from "../models/rideInfoModel.js"
import driverModel from "../models/driverModel.js"
import jwt from "jsonwebtoken"

const verifyToken = (token, email) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== email) {
        return false;
    }
    return true;
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
    try{
        const allRides = await rideInfoModel.find({isFull: false}).sort({createdAt: -1});
        return res.status(200).json()
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const completeRide = async (req, res) => {
    const id = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error: "Invalid Ride"})
        }
    
        const ride = await rideInfoModel.findOneAndUpdate({_id: id}, {currentPassengers: []})
    
        if(!ride){
            res.status(400).json({error: "Invalid Ride"})
        }
    
        res.status(200).json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRide = async (req, res) => {
    const id = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error: "Invalid Ride"})
        }
    
        const ride = await rideInfoModel.findOneAndDelete({_id: id})
    
        if(!ride){
            res.status(400).json({error: "Invalid Ride"})
        }
    
        res.status(200).json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const bookRide = async (req, res) => {
    
}

const rateDriver = async (req, res) => {

}

export {postRide}