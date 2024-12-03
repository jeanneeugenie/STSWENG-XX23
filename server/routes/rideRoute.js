import express from "express"

import {postRide, getAllRides, bookRide, completeRide, deleteRide} from "../controllers/rideinfo.js";

const router = express.Router()

router.post("/postRide", postRide)
router.get("/getAllRides", getAllRides)
router.patch("/bookRide", bookRide)
router.patch("/completeRide", completeRide)
router.delete("/deleteRide", deleteRide)

export default router