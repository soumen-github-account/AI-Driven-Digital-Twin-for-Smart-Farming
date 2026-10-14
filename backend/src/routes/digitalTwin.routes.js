
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  createDigitalTwin,
  getMyDigitalTwins,
  getDigitalTwinByField 
} from "../controllers/digitalTwin.controller.js"

const router = express.Router();

router.post("/create", protect, createDigitalTwin);

router.get("/my-digital-twins", protect, getMyDigitalTwins);

router.get("/field/:fieldId", protect, getDigitalTwinByField);

export default router;
