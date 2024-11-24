import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const driverSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@dlsu\.edu\.ph$/.test(value); // Regular expression to ensure it ends with @dlsu.edu.ph
            },
            message: props => `${props.value} is not a valid DLSU email address!`
        }
    },
    driverRating: {
        type: number,
        default: 0
    }
});

export default mongoose.model('User', driverSchema);