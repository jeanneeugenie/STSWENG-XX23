import userModel from "../models/userModel.js"
import driverModel from "../models/driverModel.js"

const login = async(req, res) => {
    const {email, password} =  req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            res.status(404).json({error: "Email not valid"})
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({message:"Login successful",user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

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
                email
            })
        }

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export {login, register}