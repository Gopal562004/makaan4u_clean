// // import { body, validationResult } from "express-validator";

// // // Handle validation errors
// // export const handleValidationErrors = (req, res, next) => {
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty()) {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Validation failed",
// //       errors: errors.array(),
// //     });
// //   }
// //   next();
// // };

// // // User registration validation
// // export const validateRegister = [
// //   body("name")
// //     .trim()
// //     .isLength({ min: 2, max: 50 })
// //     .withMessage("Name must be between 2 and 50 characters"),

// //   body("email")
// //     .isEmail()
// //     .normalizeEmail()
// //     .withMessage("Please provide a valid email"),

// //   body("password")
// //     .isLength({ min: 6 })
// //     .withMessage("Password must be at least 6 characters long"),

// //   body("phone")
// //     .matches(/^\d{10}$/)
// //     .withMessage("Phone number must be 10 digits"),

// //   body("role")
// //     .optional()
// //     .isIn(["customer", "employee", "admin"])
// //     .withMessage("Invalid role"),

// //   handleValidationErrors,
// // ];

// // // User login validation
// // export const validateLogin = [
// //   body("email")
// //     .isEmail()
// //     .normalizeEmail()
// //     .withMessage("Please provide a valid email"),

// //   body("password").notEmpty().withMessage("Password is required"),

// //   handleValidationErrors,
// // ];

// // // Property creation validation
// // export const validateProperty = [
// //   body("title")
// //     .trim()
// //     .isLength({ min: 10, max: 100 })
// //     .withMessage("Title must be between 10 and 100 characters"),

// //   body("description")
// //     .trim()
// //     .isLength({ min: 50, max: 2000 })
// //     .withMessage("Description must be between 50 and 2000 characters"),

// //   body("price")
// //     .isFloat({ min: 0 })
// //     .withMessage("Price must be a positive number"),

// //   body("type")
// //     .isIn([
// //       "apartment",
// //       "house",
// //       "villa",
// //       "condo",
// //       "townhouse",
// //       "land",
// //       "commercial",
// //     ])
// //     .withMessage("Invalid property type"),

// //   body("category")
// //     .isIn(["sale", "rent"])
// //     .withMessage("Invalid property category"),

// //   body("location.address").notEmpty().withMessage("Address is required"),

// //   body("location.city").notEmpty().withMessage("City is required"),

// //   body("location.state").notEmpty().withMessage("State is required"),

// //   body("location.pincode")
// //     .matches(/^\d{6}$/)
// //     .withMessage("Pincode must be 6 digits"),

// //   body("specifications.bedrooms")
// //     .isInt({ min: 0 })
// //     .withMessage("Bedrooms must be a positive number"),

// //   body("specifications.bathrooms")
// //     .isInt({ min: 0 })
// //     .withMessage("Bathrooms must be a positive number"),

// //   body("specifications.area")
// //     .isFloat({ min: 0 })
// //     .withMessage("Area must be a positive number"),

// //   handleValidationErrors,
// // ];

// // // Appointment validation
// // export const validateAppointment = [
// //   body("propertyId").isMongoId().withMessage("Invalid property ID"),

// //   body("appointmentDate").isISO8601().withMessage("Invalid date format"),

// //   body("appointmentTime")
// //     .isIn([
// //       "09:00",
// //       "10:00",
// //       "11:00",
// //       "12:00",
// //       "14:00",
// //       "15:00",
// //       "16:00",
// //       "17:00",
// //     ])
// //     .withMessage("Invalid time slot"),

// //   body("meetingMode")
// //     .isIn(["in-person", "virtual", "phone"])
// //     .withMessage("Invalid meeting mode"),

// //   body("message")
// //     .optional()
// //     .isLength({ max: 500 })
// //     .withMessage("Message cannot exceed 500 characters"),

// //   handleValidationErrors,
// // ];
// import { body, validationResult } from "express-validator";

// // Handle validation errors
// export const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       message: "Validation failed",
//       errors: errors.array(),
//     });
//   }
//   next();
// };

// // User registration validation
// export const validateRegister = [
//   body("name")
//     .trim()
//     .isLength({ min: 2, max: 50 })
//     .withMessage("Name must be between 2 and 50 characters"),

//   body("email")
//     .isEmail()
//     .normalizeEmail()
//     .withMessage("Please provide a valid email"),

//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),

//   body("phone")
//     .matches(/^\d{10}$/)
//     .withMessage("Phone number must be 10 digits"),

//   body("role")
//     .optional()
//     .isIn(["customer", "employee", "admin"])
//     .withMessage("Invalid role"),

//   handleValidationErrors,
// ];

// // User login validation
// export const validateLogin = [
//   body("email")
//     .isEmail()
//     .normalizeEmail()
//     .withMessage("Please provide a valid email"),

//   body("password").notEmpty().withMessage("Password is required"),

//   handleValidationErrors,
// ];

// // Property creation validation - UPDATED for direct JSON
// export const validateProperty = [
//   body("title")
//     .trim()
//     .isLength({ min: 10, max: 100 })
//     .withMessage("Title must be between 10 and 100 characters"),

//   body("description")
//     .trim()
//     .isLength({ min: 50, max: 2000 })
//     .withMessage("Description must be between 50 and 2000 characters"),

//   body("price")
//     .isFloat({ min: 0 })
//     .withMessage("Price must be a positive number"),

//   body("type")
//     .isIn([
//       "apartment",
//       "house",
//       "villa",
//       "condo",
//       "townhouse",
//       "land",
//       "commercial",
//     ])
//     .withMessage("Invalid property type"),

//   body("category")
//     .isIn(["sale", "rent"])
//     .withMessage("Invalid property category"),

//   // Location validation for direct JSON
//   body("location.address").notEmpty().withMessage("Address is required"),

//   body("location.city").notEmpty().withMessage("City is required"),

//   body("location.state").notEmpty().withMessage("State is required"),

//   body("location.pincode")
//     .matches(/^\d{6}$/)
//     .withMessage("Pincode must be 6 digits"),

//   // Specifications validation for direct JSON
//   body("specifications.bedrooms")
//     .isInt({ min: 0 })
//     .withMessage("Bedrooms must be a positive number"),

//   body("specifications.bathrooms")
//     .isInt({ min: 0 })
//     .withMessage("Bathrooms must be a positive number"),

//   body("specifications.area")
//     .isFloat({ min: 0 })
//     .withMessage("Area must be a positive number"),

//   handleValidationErrors,
// ];

// // Appointment validation
// export const validateAppointment = [
//   body("propertyId").isMongoId().withMessage("Invalid property ID"),

//   body("appointmentDate").isISO8601().withMessage("Invalid date format"),

//   body("appointmentTime")
//     .isIn([
//       "09:00",
//       "10:00",
//       "11:00",
//       "12:00",
//       "14:00",
//       "15:00",
//       "16:00",
//       "17:00",
//     ])
//     .withMessage("Invalid time slot"),

//   body("meetingMode")
//     .isIn(["in-person", "virtual", "phone"])
//     .withMessage("Invalid meeting mode"),

//   body("message")
//     .optional()
//     .isLength({ max: 500 })
//     .withMessage("Message cannot exceed 500 characters"),

//   handleValidationErrors,
// ];
import { body, validationResult } from "express-validator";

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// User registration validation
export const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits"),

  body("role")
    .optional()
    .isIn(["customer", "employee", "admin"])
    .withMessage("Invalid role"),

  handleValidationErrors,
];

// User login validation
export const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

// Property creation validation - UPDATED with more flexible rules
export const validateProperty = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 }) // Reduced min from 10 to 5
    .withMessage("Title must be between 5 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 20, max: 5000 }) // Reduced min from 50 to 20, increased max
    .withMessage("Description must be between 20 and 5000 characters"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("type")
    .isIn([
      "apartment",
      "house",
      "villa",
      "condo",
      "townhouse",
      "land",
      "commercial",
      "residential", // Added lowercase versions
      "Residential", // Added capitalized version
      "Commercial", // Added capitalized version
    ])
    .withMessage("Invalid property type"),

  body("category")
    .isIn(["sale", "rent", "Sale", "Rent"]) // Added capitalized versions
    .withMessage("Invalid property category"),

  // Location validation - make optional for testing
  body("location.address")
    .optional()
    .notEmpty()
    .withMessage("Address is required"),

  body("location.city").optional().notEmpty().withMessage("City is required"),

  body("location.state").optional().notEmpty().withMessage("State is required"),

  body("location.pincode")
    .optional()
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be 6 digits"),

  // Specifications validation - make optional for testing
  body("specifications.bedrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a positive number"),

  body("specifications.bathrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bathrooms must be a positive number"),

  body("specifications.area")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Area must be a positive number"),

  handleValidationErrors,
];

// Appointment validation
export const validateAppointment = [
  body("propertyId").isMongoId().withMessage("Invalid property ID"),

  body("appointmentDate").isISO8601().withMessage("Invalid date format"),

  body("appointmentTime")
    .isIn([
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ])
    .withMessage("Invalid time slot"),

  body("meetingMode")
    .isIn(["in-person", "virtual", "phone"])
    .withMessage("Invalid meeting mode"),

  body("message")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),

  handleValidationErrors,
];