import express from "express"

import { postRide, getAllRides} from "../controllers/rideinfo.js";

const router = express.Router()

router.post("/postRide", postRide)
router.get("/getAllRides", getAllRides)

export default router