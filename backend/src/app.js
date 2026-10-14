import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import farmRoutes from "./routes/farm.routes.js"
import fieldRoutes from "./routes/field.routes.js"
import digitalTwinRoutes from "./routes/digitalTwin.routes.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())


app.get("/api/v1/health", (req, res) => {
    res.json({
        success: true,
        message: "AgriTwin API is running"
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/farms", farmRoutes);
app.use("/api/v1/fields", fieldRoutes);
app.use("/api/v1/digital-twins", digitalTwinRoutes);

export default app;