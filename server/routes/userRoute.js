import express from "express"

import {rateDriver, editProfile} from "../controllers/user.js";

const router = express.Router()

router.patch("/rateDriver", rateDriver)
router.put("/editProfile", editProfile)

export default router