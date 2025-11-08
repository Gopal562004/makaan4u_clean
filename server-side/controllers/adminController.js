

import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import nodemailer from "nodemailer";

import User from "../models/User.js";
import Property from "../models/Property.js";
import Appointment from "../models/Appointment.js";
import Lead from "../models/Lead.js";
import Review from "../models/Review.js";

/* ============================================================
   📊 ADMIN DASHBOARD STATS OVERVIEW
============================================================ */
export const getDashboardStats = async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const [
      totalUsers,
      totalAgents,
      totalProperties,
      totalAppointments,
      totalLeads,
      recentProperties,
      recentAppointments,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: { $in: ["employee", "admin"] } }),
      Property.countDocuments(),
      Appointment.countDocuments(),
      Lead.countDocuments(),
      Property.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("postedBy", "name email"),
      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("property", "title")
        .populate("customer", "name email")
        .populate("employee", "name email"),
    ]);

    // Revenue stats
    const [revenueStats] = await Property.aggregate([
      { $match: { status: "sold" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
          averagePrice: { $avg: "$price" },
        },
      },
    ]);

    // Property by status
    const propertyStats = await Property.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Appointment by status
    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          agents: totalAgents,
        },
        properties: {
          total: totalProperties,
          byStatus: propertyStats,
        },
        appointments: {
          total: totalAppointments,
          byStatus: appointmentStats,
        },
        leads: {
          total: totalLeads,
        },
        revenue: revenueStats || { totalRevenue: 0, averagePrice: 0 },
      },
      recent: {
        properties: recentProperties,
        appointments: recentAppointments,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats.",
      error: error.message,
    });
  }
};

/* ============================================================
   👥 MANAGE USERS (List / Filter / Search)
============================================================ */
export const manageUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const { page = 1, limit = 20, role, search } = req.query;

    const query = {};

    if (role) query.role = role;

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((page - 1) * limit),
      User.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        count: users.length,
      },
    });
  } catch (error) {
    console.error("Manage Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

/* ============================================================
   ⚙️ UPDATE USER STATUS / ROLE
============================================================ */
export const updateUserStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const { isActive, role } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { ...(isActive !== undefined && { isActive }), ...(role && { role }) },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update User Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status.",
      error: error.message,
    });
  }
};

/* ============================================================
   🧾 EXPORT DASHBOARD DATA (PDF / CSV / EXCEL / EMAIL)
============================================================ */
export const exportDashboardData = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const { formats = [], emailDelivery, emailAddress } = req.body;

    const exportDir = path.join(process.cwd(), "exports");
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

    // Fetch data to export
    const [properties, users, appointments] = await Promise.all([
      Property.find().lean(),
      User.find().select("-password").lean(),
      Appointment.find().lean(),
    ]);

    const exportedFiles = [];

    // Generate CSV
    if (formats.includes("csv")) {
      const parser = new Parser();
      const csv = parser.parse(properties);
      const csvPath = path.join(exportDir, `properties_${Date.now()}.csv`);
      fs.writeFileSync(csvPath, csv);
      exportedFiles.push(csvPath);
    }

    // Generate Excel
    if (formats.includes("excel")) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Properties");
      sheet.columns = [
        { header: "Title", key: "title", width: 30 },
        { header: "Price", key: "price", width: 15 },
        { header: "Status", key: "status", width: 15 },
        { header: "Posted By", key: "postedBy", width: 20 },
      ];
      properties.forEach((p) => sheet.addRow(p));
      const excelPath = path.join(exportDir, `properties_${Date.now()}.xlsx`);
      await workbook.xlsx.writeFile(excelPath);
      exportedFiles.push(excelPath);
    }

    // Generate PDF
    if (formats.includes("pdf")) {
      const pdfPath = path.join(exportDir, `report_${Date.now()}.pdf`);
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.fontSize(20).text("Admin Dashboard Report", { align: "center" });
      doc.moveDown();
      properties.forEach((p) =>
        doc.text(`${p.title} - ₹${p.price} - ${p.status}`)
      );
      doc.end();
      exportedFiles.push(pdfPath);
    }

    // Email Delivery
    if (emailDelivery && emailAddress) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailAddress,
        subject: "Dashboard Export Data",
        text: "Attached are the exported reports.",
        attachments: exportedFiles.map((file) => ({
          filename: path.basename(file),
          path: file,
        })),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Export completed successfully.",
      files: exportedFiles.map((file) => path.basename(file)),
    });
  } catch (error) {
    console.error("Export Dashboard Data Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export data.",
      error: error.message,
    });
  }
};

/* ============================================================
   📈 SALES TREND DATA
============================================================ */
export const getSalesTrend = async (req, res) => {
  try {
    // Mock sales trend data — replace with real aggregation later
    const salesTrend = [
      { month: "Jan", sales: 45, revenue: 2400000, leads: 120 },
      { month: "Feb", sales: 52, revenue: 2800000, leads: 135 },
      { month: "Mar", sales: 48, revenue: 2600000, leads: 128 },
      { month: "Apr", sales: 61, revenue: 3200000, leads: 145 },
      { month: "May", sales: 55, revenue: 2900000, leads: 132 },
      { month: "Jun", sales: 67, revenue: 3500000, leads: 158 },
      { month: "Jul", sales: 59, revenue: 3100000, leads: 142 },
      { month: "Aug", sales: 72, revenue: 3800000, leads: 165 },
      { month: "Sep", sales: 68, revenue: 3600000, leads: 152 },
      { month: "Oct", sales: 75, revenue: 3900000, leads: 170 },
    ];

    res.status(200).json({
      success: true,
      trend: salesTrend,
    });
  } catch (error) {
    console.error("Sales Trend Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales trend data.",
    });
  }
};

/* ============================================================
   🏠 PROPERTY STATUS OVERVIEW
============================================================ */
/* ============================================================
   🏠 REAL PROPERTY STATUS OVERVIEW
   Shows counts of properties by listing status, city, and agent.
============================================================ */
// export const getPropertyStatusOverview = async (req, res) => {
//   try {
//     // 1️⃣ Aggregate property counts by status
//     const propertyStats = await Property.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//           avgPrice: { $avg: "$price" },
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     // 2️⃣ Latest listed properties (most recent active listings)
//     const latestListed = await Property.find({ isActive: true })
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select(
//         "title price status location.city listedDate views images postedBy"
//       )
//       .populate("postedBy", "name email avatar");

//     // 3️⃣ Top 5 most viewed properties
//     const mostViewed = await Property.find({ isActive: true })
//       .sort({ views: -1 })
//       .limit(5)
//       .select("title price status views location.city images");

//     // 4️⃣ Global analytics: total views + average per property
//     const totalViewsAgg = await Property.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalViews: { $sum: "$views" },
//           avgViewsPerProperty: { $avg: "$views" },
//           totalProperties: { $sum: 1 },
//         },
//       },
//     ]);

//     const analytics = totalViewsAgg[0] || {
//       totalViews: 0,
//       avgViewsPerProperty: 0,
//       totalProperties: 0,
//     };

//     // 5️⃣ Impressions analytics (if you later track "impressions" field)
//     // Defaulting to views-based stats for now
//     const impressionStats = {
//       totalImpressions: analytics.totalViews * 3, // Example ratio
//       avgImpressionsPerProperty: analytics.avgViewsPerProperty * 3,
//     };

//     // ✅ Final Response
//     res.status(200).json({
//       success: true,
//       propertyStatus: propertyStats,
//       recentProperties: latestListed,
//       topViewed: mostViewed,
//       analytics: {
//         ...analytics,
//         ...impressionStats,
//       },
//     });
//   } catch (error) {
//     console.error("Property Status Overview Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch property analytics.",
//       error: error.message,
//     });
//   }
// };

export const getPropertyStatusOverview = async (req, res) => {
  try {
    // 1️⃣ Aggregate property counts by status with fallback
    let propertyStats = [];
    try {
      propertyStats = await Property.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            avgPrice: { $avg: "$price" },
          },
        },
        { $sort: { count: -1 } },
      ]);
    } catch (aggregateError) {
      console.warn(
        "Aggregation failed, using fallback:",
        aggregateError.message
      );
      // Fallback: Get counts manually
      const statusCounts = await Property.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);
      propertyStats = statusCounts.map((stat) => ({
        ...stat,
        avgPrice: 0,
      }));
    }

    // 2️⃣ Latest listed properties with error handling
    let latestListed = [];
    try {
      latestListed = await Property.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "title price status location.city listedDate views images postedBy"
        )
        .populate("postedBy", "name email avatar")
        .lean();
    } catch (latestError) {
      console.warn("Failed to fetch latest properties:", latestError.message);
      // Fallback without population
      latestListed = await Property.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title price status views")
        .lean();
    }

    // 3️⃣ Top viewed properties with error handling
    let mostViewed = [];
    try {
      mostViewed = await Property.find({ isActive: true })
        .sort({ views: -1 })
        .limit(5)
        .select("title price status views location.city images")
        .lean();
    } catch (viewedError) {
      console.warn(
        "Failed to fetch most viewed properties:",
        viewedError.message
      );
      mostViewed = [];
    }

    // 4️⃣ Global analytics with comprehensive error handling
    let analytics = {
      totalViews: 0,
      avgViewsPerProperty: 0,
      totalProperties: 0,
      totalImpressions: 0,
      avgImpressionsPerProperty: 0,
    };

    try {
      const totalViewsAgg = await Property.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
            avgViewsPerProperty: { $avg: "$views" },
            totalProperties: { $sum: 1 },
          },
        },
      ]);

      if (totalViewsAgg.length > 0) {
        analytics = {
          totalViews: totalViewsAgg[0].totalViews || 0,
          avgViewsPerProperty: Math.round(
            totalViewsAgg[0].avgViewsPerProperty || 0
          ),
          totalProperties: totalViewsAgg[0].totalProperties || 0,
        };

        // Calculate impression stats
        analytics.totalImpressions = analytics.totalViews * 3;
        analytics.avgImpressionsPerProperty = Math.round(
          analytics.avgViewsPerProperty * 3
        );
      } else {
        // Fallback if no data
        const totalProperties = await Property.countDocuments();
        analytics.totalProperties = totalProperties;
      }
    } catch (analyticsError) {
      console.warn("Analytics aggregation failed:", analyticsError.message);
      // Use basic counts as fallback
      analytics.totalProperties = await Property.countDocuments();
    }

    // 5️⃣ Ensure all arrays are properly formatted
    const safePropertyStats = propertyStats.map((stat) => ({
      _id: stat._id || "unknown",
      count: stat.count || 0,
      avgPrice: Math.round(stat.avgPrice || 0),
    }));

    const safeLatestListed = latestListed.map((property) => ({
      _id: property._id,
      title: property.title || "Untitled Property",
      price: property.price || 0,
      status: property.status || "available",
      views: property.views || 0,
      location: property.location || { city: "Unknown" },
      images: property.images || [],
      postedBy: property.postedBy || { name: "Unknown Agent" },
      listedDate: property.listedDate || property.createdAt,
    }));

    const safeMostViewed = mostViewed.map((property) => ({
      _id: property._id,
      title: property.title || "Untitled Property",
      price: property.price || 0,
      status: property.status || "available",
      views: property.views || 0,
      location: property.location || { city: "Unknown" },
      images: property.images || [],
    }));

    // ✅ Final Response with safe data
    res.status(200).json({
      success: true,
      propertyStatus: safePropertyStats,
      recentProperties: safeLatestListed,
      topViewed: safeMostViewed,
      analytics: analytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Property Status Overview Critical Error:", error);

    // ✅ Fallback response even if everything fails
    res.status(500).json({
      success: false,
      message: "Failed to fetch property analytics.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      fallbackData: {
        propertyStatus: [],
        recentProperties: [],
        topViewed: [],
        analytics: {
          totalViews: 0,
          avgViewsPerProperty: 0,
          totalProperties: 0,
          totalImpressions: 0,
          avgImpressionsPerProperty: 0,
        },
      },
    });
  }
};
/* ============================================================
   ⚡ RECENT ACTIVITY (Recent Properties, Appointments, etc.)
============================================================ */
export const getRecentActivity = async (req, res) => {
  try {
    const recentProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title price status createdAt");

    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("property", "title")
      .populate("customer", "name");

    res.status(200).json({
      success: true,
      recentProperties,
      recentAppointments,
    });
  } catch (error) {
    console.error("Recent Activity Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity.",
    });
  }
};

/* ============================================================
   📅 DATE RANGE FILTER
============================================================ */
export const getDataByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide startDate and endDate.",
      });
    }

    const properties = await Property.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Date Range Data Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch date range data.",
    });
  }
};

/* ============================================================
   ⚙️ QUICK ACTIONS SUMMARY
============================================================ */
export const getQuickActionsSummary = async (req, res) => {
  try {
    const [totalProperties, pendingAppointments, totalEmployees] =
      await Promise.all([
        Property.countDocuments(),
        Appointment.countDocuments({ status: "pending" }),
        User.countDocuments({ role: "employee" }),
      ]);

    res.status(200).json({
      success: true,
      summary: {
        totalProperties,
        pendingAppointments,
        totalEmployees,
      },
    });
  } catch (error) {
    console.error("Quick Actions Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quick actions summary.",
    });
  }
};


export const exportReports = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const {
      formats = ["excel"],
      reports = [],
      emailDelivery,
      emailAddress,
    } = req.body;

    const exportDir = path.join(process.cwd(), "exports");
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

    // 1️⃣ Fetch all data (you can expand these as needed)
    const [properties, users, appointments, leads, reviews] = await Promise.all(
      [
        Property.find().populate("postedBy", "name email").lean(),
        User.find().select("-password").lean(),
        Appointment.find()
          .populate("property", "title")
          .populate("customer", "name")
          .lean(),
        Lead.find()
          .populate("property", "title")
          .populate("user", "name")
          .lean(),
        Review.find()
          .populate("property", "title")
          .populate("user", "name")
          .lean(),
      ]
    );

    // Mock property views — replace with PropertyView model if exists
    const propertyViews = properties.map((p) => ({
      title: p.title,
      views: p.views || Math.floor(Math.random() * 500),
      postedBy: p.postedBy?.name || "Unknown",
    }));

    const allReports = {
      properties,
      users,
      appointments,
      leads,
      reviews,
      propertyViews,
    };

    const exportedFiles = [];

    /* ============================================================
       📊 EXPORT TO EXCEL
    ============================================================= */
    if (formats.includes("excel")) {
      const workbook = new ExcelJS.Workbook();

      for (const [key, data] of Object.entries(allReports)) {
        const sheet = workbook.addWorksheet(key.toUpperCase());
        if (data.length > 0) {
          const columns = Object.keys(data[0]).map((field) => ({
            header: field.toUpperCase(),
            key: field,
            width: 25,
          }));
          sheet.columns = columns;
          data.forEach((item) => sheet.addRow(item));
        } else {
          sheet.addRow(["No records available"]);
        }
      }

      const excelPath = path.join(exportDir, `reports_${Date.now()}.xlsx`);
      await workbook.xlsx.writeFile(excelPath);
      exportedFiles.push(excelPath);
    }

    /* ============================================================
       📈 EXPORT TO CSV
    ============================================================= */
    if (formats.includes("csv")) {
      for (const [key, data] of Object.entries(allReports)) {
        const parser = new Parser();
        const csv = data.length ? parser.parse(data) : "No records available";
        const csvPath = path.join(exportDir, `${key}_${Date.now()}.csv`);
        fs.writeFileSync(csvPath, csv);
        exportedFiles.push(csvPath);
      }
    }

    /* ============================================================
       🧾 EXPORT TO PDF (Summary Only)
    ============================================================= */
    if (formats.includes("pdf")) {
      const pdfPath = path.join(exportDir, `summary_${Date.now()}.pdf`);
      const doc = new PDFDocument({ margin: 40 });
      doc.pipe(fs.createWriteStream(pdfPath));

      doc.fontSize(22).text("Reports Summary", { align: "center" });
      doc.moveDown();

      const addSection = (title, count) => {
        doc.fontSize(16).text(title, { underline: true });
        doc.fontSize(12).text(`Total Records: ${count}`).moveDown();
      };

      addSection("Properties", properties.length);
      addSection("Users", users.length);
      addSection("Appointments", appointments.length);
      addSection("Leads", leads.length);
      addSection("Reviews", reviews.length);
      addSection("Property Views", propertyViews.length);

      doc.end();
      exportedFiles.push(pdfPath);
    }

    /* ============================================================
       📧 EMAIL DELIVERY
    ============================================================= */
    if (emailDelivery && emailAddress) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailAddress,
        subject: "Admin Reports Export",
        text: "Attached are the requested reports from the admin dashboard.",
        attachments: exportedFiles.map((file) => ({
          filename: path.basename(file),
          path: file,
        })),
      });
    }

    res.status(200).json({
      success: true,
      message: "Reports exported successfully.",
      files: exportedFiles.map((file) => path.basename(file)),
    });
  } catch (error) {
    console.error("Export Reports Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export reports.",
      error: error.message,
    });
  }
};

