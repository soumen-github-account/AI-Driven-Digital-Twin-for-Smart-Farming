import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const protect = async (req, res, next) => {
  try {
    // ==========================================
    // GET TOKEN
    // ==========================================

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // ==========================================
    // VERIFY TOKEN
    // ==========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded JWT:", decoded);

    // ==========================================
    // CHECK USER ID
    // ==========================================

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    // ==========================================
    // GET USER FROM DATABASE
    // ==========================================

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        authProvider: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ==========================================
    // USER NOT FOUND
    // ==========================================

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // ATTACH USER TO REQUEST
    // ==========================================

    req.user = user;

    // ==========================================
    // CONTINUE
    // ==========================================

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    // ==========================================
    // TOKEN EXPIRED
    // ==========================================

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    // ==========================================
    // INVALID TOKEN
    // ==========================================

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // ==========================================
    // SERVER ERROR
    // ==========================================

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};