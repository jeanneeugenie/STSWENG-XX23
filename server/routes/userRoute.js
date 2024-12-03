import express from "express"

import {getDriverRides, getPastRides, rateDriver, editProfile} from "../controllers/user.js";

const router = express.Router()

router.get("/getDriverRides", getDriverRides)
router.get("/getPastRides", getPastRides)
router.patch("/rateDriver", rateDriver)
router.put("/editProfile", editProfile)

export default router