import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { googleOAuth2Client } from "../config/google.js";
import { google } from "googleapis";

export const registerUser = async ({
  name,
  email,
  phone,
  password,
  role,
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  if (phone) {
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      throw new Error("Phone number already registered");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      authProvider: "LOCAL",
    },
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

export const googleLoginOrRegister = async ({
  code,
  role = "FARMER",
  phone = null,
}) => {
  if (!code) {
    throw new Error("Google authorization code is required");
  }

  const { tokens } = await googleOAuth2Client.getToken(code);

  if (!tokens.access_token) {
    throw new Error("Google access token was not received");
  }

  googleOAuth2Client.setCredentials(tokens);

  const oauth2 = googleOAuth2Client;

  const { data: googleUser } =
    await google.oauth2("v2").userinfo.get({
      auth: oauth2,
    });

  const {
    id: googleId,
    email,
    name,
    picture,
    verified_email,
  } = googleUser;

  if (!email) {
    throw new Error("Google account email not available");
  }

  if (!verified_email) {
    throw new Error("Google email is not verified");
  }

  let user = await prisma.user.findUnique({
    where: {
      googleId,
    },
  });

  if (!user) {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  if (user) {
    if (!user.googleId) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          googleId,
          authProvider: "GOOGLE",
        },
      });
    }
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name || "Google User",
        email,
        phone: phone || null,
        googleId,
        role,
        authProvider: "GOOGLE",
      },
    });
  }

  const token = generateToken(user);

  return {
    user,
    token,
    picture,
    googleId,
  };
};

export const loginUser = async ({
  identifier,
  password,
  method,
}) => {
  let user;

  if (method === "email") {
    user = await prisma.user.findUnique({
      where: {
        email: identifier,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        phone: identifier,
      },
    });
  }

  if (!user) {
    throw new Error("Invalid email/phone or password");
  }

  if (!user.password) {
    throw new Error(
      "This account uses Google login. Please continue with Google."
    );
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email/phone or password");
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};