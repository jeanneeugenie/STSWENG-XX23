import express from "express"

import { postRide } from "../controllers/rideinfo.js";

const router = express.Router()

router.post("/postRide", postRide)
router.post("/getAllRides")

export default router