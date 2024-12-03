import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    password:{
        type: String,
        required:true
    },
    idNumber: {
        type: Number,
        required: true, 
        validate: {
            validator: function (value) {
              // Check if the number has exactly 8 digits
              return /^\d{8}$/.test(value.toString());
            },
            message: (props) => `${props.value} is not a valid ID number! It must be exactly 8 digits.`,
        }
    },
    name: {
        type: String,
        required: true
    },
    driverBool:{
        type: Boolean,
        default: false
    },
    DepCourse: {
        type: String,
        default: ""
    },
    usualRoute:{
        type: String,
        default: ""
    },
    usualSched:{
        type: String,
        default: ""
    }
});

// Pre-save Middleware for Password Hashing
userSchema.pre('save', async function (next) {
    // Only hash the password if it's new or modified
    if (!this.isModified('password')) return next();
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to Compare Passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

export default mongoose.model('User', userSchema);