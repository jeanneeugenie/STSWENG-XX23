import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const rideinfoSchema = new Schema({
    driverEmail: {
        type: String,
        required: true
    },
    dropoff: {
        type: String,
        required: true
    },
    pickupPoint: {
        type: String,
        required: true
    },
    pickupTimeHour: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value >= 0 && value <= 24;
            },
            message: (props) => `${props.value} is not a valid hour! Please provide a value between 0 and 24.`,
        }
    },
    pickupTimeMinute: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value >= 0 && value <= 59;
            },
            message: (props) => `${props.value} is not a valid minute! Please provide a value between 0 and 59.`,
        }
    },
    driver: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    maxPassengers: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: props => `${props.value} is not a valid positive integer!`
        }
    },
    currentPassengers: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length <= this.maxPassengers;
            },
            message: (props) => `Cannot have more than ${props.instance.maxPassengers} passengers!`,
        }
    },
    isFull: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});


export default mongoose.model('RideInfo', rideinfoSchema);
