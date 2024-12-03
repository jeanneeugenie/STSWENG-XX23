import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//route imports
import authRoutes from "./routes/authRoute.js"
import rideRoutes from "./routes/rideRoute.js"

dotenv.config();

const app = express();

//middleware
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

// limit images to 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
app.get("/", (req, res) => {
    res.json({mssg:"Welcome to STSWING"})
});

app.use('/api/auth', authRoutes)
app.use('/api/ride', rideRoutes)


//connect to mongodb then listen to requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    });