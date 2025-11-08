import rateLimit from "express-rate-limit";

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter - stricter for login/register
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Property creation rate limiter
export const propertyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 property creations per hour
  message: {
    success: false,
    message: "Too many properties created, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Appointment booking rate limiter
export const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 appointment bookings per hour
  message: {
    success: false,
    message: "Too many appointments booked, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
