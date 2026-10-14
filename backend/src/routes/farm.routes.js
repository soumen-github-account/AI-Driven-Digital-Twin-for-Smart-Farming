import express from "express";
import upload from "../middlewares/upload.js";
import { createFarm, deleteFarm, getAllFarms, getFarmById, updateFarm } from "../controllers/farm.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/create-farm", protect, upload.single("image"), createFarm);
router.get("/get-all-farms", protect, getAllFarms);
router.get("/get-farm/:id", protect, getFarmById);
router.put("/update-farm/:id", protect, upload.single("image"), updateFarm);
router.delete("/delete-farm/:id", protect, deleteFarm);

export default router;