// import express from "express";

// import {
//     register,
//     login,
//     googleRegister
// } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/google", googleRegister);

// export default router;

import express from "express";

import {
  register,
  login,
  googleAuth,
  googleCallback,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Normal
router.post("/register", register);

router.post("/login", login);

// Google
router.get("/google", googleAuth);

router.get(
  "/google/callback",
  googleCallback
);

export default router;