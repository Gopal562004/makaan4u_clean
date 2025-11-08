import jwt from "jsonwebtoken";

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Generate refresh token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "90d",
  });
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

// Set JWT token as cookie
export const setTokenCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("token", token, cookieOptions);
};

// Clear JWT token cookie
export const clearTokenCookie = (res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
};
