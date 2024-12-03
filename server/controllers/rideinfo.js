import mongoose from "mongoose";
import rideInfoModel from "../models/rideInfoModel.js"
import driverModel from "../models/driverModel.js"

const postRide = async (req, res) => {
    const {dropoff, pickupPoint, pickupTime, vehicle} =  req.body

    try{
        const ride = await rideInfoModel.create({
            dropoff,
            pickupPoint,
            pickupTime,
            vehicle
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

export {postRide, getAllRides, completeRide, deleteRide}