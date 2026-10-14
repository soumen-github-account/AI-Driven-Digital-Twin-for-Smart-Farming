import {
  registerUser,
  googleLoginOrRegister,
  loginUser,
} from "../services/auth.service.js";

import { googleOAuth2Client } from "../config/google.js";

import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and role are required",
      });
    }

    const result = await registerUser({
      name,
      email,
      phone,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
        },
        token: result.token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      method,
      identifier,
      password,
      rememberMe,
    } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email/phone and password are required",
      });
    }

    const result = await loginUser({
      identifier,
      password,
      method,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
        },
        token: result.token,
        rememberMe,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleAuth = (req, res) => {
  try {
    const state = crypto.randomBytes(32).toString("hex");

    const authUrl =
      googleOAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "openid",
          "email",
          "profile",
        ],
        include_granted_scopes: true,
        state,
        prompt: "select_account",
      });

    // Temporary state cookie
    res.cookie("google_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
    });

    return res.redirect(authUrl);
  } catch (error) {
    console.error(
      "Google auth start error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to start Google authentication",
    });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const {
      code,
      state,
      error,
    } = req.query;

    // -------------------------------------------------
    // User cancelled Google login
    // -------------------------------------------------

    if (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?google_error=cancelled`
      );
    }

    // -------------------------------------------------
    // Missing code
    // -------------------------------------------------

    if (!code) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?google_error=missing_code`
      );
    }

    // -------------------------------------------------
    // CSRF state validation
    // -------------------------------------------------

    const savedState =
      req.cookies.google_oauth_state;

    if (
      !state ||
      !savedState ||
      state !== savedState
    ) {
      console.error(
        "Google OAuth state mismatch"
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/login?google_error=invalid_state`
      );
    }

    // Delete state cookie
    res.clearCookie("google_oauth_state");

    // -------------------------------------------------
    // Google authentication
    // -------------------------------------------------

    const result =
      await googleLoginOrRegister({
        code,
      });

    // -------------------------------------------------
    // Redirect frontend with OUR JWT
    // -------------------------------------------------

    const params = new URLSearchParams({
      token: result.token,
    });

    return res.redirect(
      `${process.env.FRONTEND_URL}/google-callback?${params.toString()}`
    );
  } catch (error) {
    console.error(
      "Google callback error:",
      error
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?google_error=authentication_failed`
    );
  }
};