import mongoose from "mongoose";

const Schema = mongoose.Schema;

const completeRideSchema = new Schema({
    driverEmail:{
        type:String,
        required:true
    },
    driver:{
        type:String,
        required:true
    },
    dropoff:{
        type:String,
        required:true
    },
    pickup:{
        type:String,
        required:true
    },
    passengers:{ 
        type:[String],
        required:true
    },
    completionDate:{ //automatically set using timestamps
        type:Date,
        required: true
    }
});

export default mongoose.model('completedRide', completeRideSchema);