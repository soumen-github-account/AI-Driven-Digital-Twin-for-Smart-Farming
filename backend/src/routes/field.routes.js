import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createField, getFieldsByFarmId, getMyFields } from "../controllers/field.controller.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

router.post("/create-field", protect, upload.single("image"), createField);
router.get("/get-my-fields", protect, getMyFields);
router.get("/get-my-fields/:farmId", protect, getFieldsByFarmId);

export default router;