import express from "express"

import {getUserProfile, getDriverRides, getPastRides, rateDriver, editProfile} from "../controllers/user.js";

const router = express.Router()

router.get("/getUserProfile", getUserProfile)
router.get("/getDriverRides", getDriverRides)
router.get("/getPastRides", getPastRides)
router.patch("/rateDriver", rateDriver)
router.patch("/editProfile", editProfile)

export default router