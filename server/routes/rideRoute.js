import express from "express"

import { postRide, getAllRides } from "../controllers/rideinfo.js";

const router = express.Router()

router.get("/postRide", postRide)
router.post("/getAllRides", getAllRides)

export default router