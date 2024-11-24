import mongoose from 'mongoose'

const Schema = mongoose.Schema

const rideinfoSchema = new Schema({
    driverEmail:{
        type: String,
        required: true
    },
    dropoff: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    pickupTime: {
        type: datetime,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    plateNo: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('RideInfo', rideinfoSchema);
