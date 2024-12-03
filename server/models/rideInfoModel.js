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
    pickupPoint: {
        type: String,
        required: true
    },
    pickupTime: {
        type: Date,
        required: true
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
                // Ensure the value is a positive integer
                return Number.isInteger(value) && value > 0;
            },
            message: props => `${props.value} is not a valid positive integer!`
        }
    },
    currentPassengers: {
        type: [String],
        validate: {
            validator: function (v) {
              // Use this.maxPassengers to access maxPassengers within the validator
              return v.length <= this.maxPassengers;
            },
            message: (props) =>
              `Cannot have more than ${props.instance.maxPassengers} passengers!`,
          }
    }, isFull: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

rideinfoSchema.pre('save', function (next) {
    // Check if the number of current passengers is equal to max passengers
    if (this.currentPassengers.length === this.maxPassengers) {
      this.isFull = true;
    } else {
      this.isFull = false;
    }
    next();
});

export default mongoose.model('RideInfo', rideinfoSchema);
