import userModel from "../models/userModel.js";
import driverModel from "../models/driverModel.js";
import jwt from "jsonwebtoken";

const createToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'})
};

const login = async(req, res) => {
    const {email, password} =  req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({error: "User doesn't exist"});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = createToken(email);

        res.cookie(
            'token', token, 
            { httpOnly: false, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 } //changed httpOnly to false
        );
        res.cookie(
            'email', email, 
            { httpOnly: false, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
        );

        return res.status(200).json({message: "Login Successful"});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const register = async (req, res) => {
    const { email, password, idNumber, name, driverBool } = req.body;

    try {
        const user = await userModel.create({
            email,
            password,
            idNumber,
            name,
            driverBool
        });

        if(driverBool){
            const driver = await driverModel.create({
                email,
                name
            })
        }

        const token = createToken(email);

        res.cookie(
            'token', token, 
            { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
        );
        res.cookie(
            'email', email, 
            { httpOnly: false, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
        );

        return res.status(201).json({message: "User Created Successfully"});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.clearCookie('email', { httpOnly: false, secure: true });
    res.status(200).json({ message: "Logged out successfully" });
}

export {login, register, logout};