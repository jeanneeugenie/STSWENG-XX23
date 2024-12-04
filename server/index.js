import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//route imports
import authRoutes from "./routes/authRoute.js"
import rideRoutes from "./routes/rideRoute.js"
import userRoutes from "./routes/userRoute.js"

dotenv.config();

const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        // Allow HTTP or HTTPS on any IP with port 3000
        const allowed = /^https?:\/\/[\d.]+:3000$/.test(origin) || origin === "http://localhost:3000" || origin === "https://localhost:3000";
        if (allowed || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};



//middleware
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors(corsOptions));

// limit images to 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//routes
app.get("/", (req, res) => {
    res.json({mssg:"Welcome to STSWING"})
});

app.use('/api/auth', authRoutes)
app.use('/api/ride', rideRoutes)
app.use('/api/user', userRoutes)

app.use((err, req, res, next) => {
    if (err instanceof Error && err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'CORS policy does not allow this origin.' });
    } else {
        next(err);
    }
});

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