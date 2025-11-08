// import fs from "fs";
// import path from "path";
// import ExcelJS from "exceljs";
// import PDFDocument from "pdfkit";
// import { Parser } from "json2csv";
// import archiver from "archiver";
// import nodemailer from "nodemailer";

// import User from "../models/User.js";
// import Property from "../models/Property.js";
// import Appointment from "../models/Appointment.js";
// import Lead from "../models/Lead.js";
// import Review from "../models/Review.js";
// import PropertyView from "../models/PropertyView.js";

// /* ============================================================
//    🧾 EXPORT REPORTS — supports Excel, CSV, PDF, and email ZIP
// ============================================================ */
// export const exportReports = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admin only.",
//       });
//     }

//     const {
//       formats = ["excel"],
//       reports = ["users", "properties", "propertyViews"],
//       emailDelivery,
//       emailAddress,
//     } = req.body;

//     // create export folder if missing
//     const exportDir = path.join(process.cwd(), "exports");
//     if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

//     // fetch data dynamically
//     const dataSets = {};
//     if (reports.includes("users")) {
//       dataSets.users = await User.find().select("-password").lean();
//     }
//     if (reports.includes("properties")) {
//       dataSets.properties = await Property.find()
//         .populate("postedBy", "name email")
//         .lean();
//     }
//     if (reports.includes("propertyViews")) {
//       dataSets.propertyViews = await PropertyView.find()
//         .populate("property", "title")
//         .populate("user", "name email")
//         .lean();
//     }
//     if (reports.includes("appointments")) {
//       dataSets.appointments = await Appointment.find()
//         .populate("property", "title")
//         .populate("customer", "name")
//         .lean();
//     }
//     if (reports.includes("leads")) {
//       dataSets.leads = await Lead.find()
//         .populate("property", "title")
//         .populate("user", "name")
//         .lean();
//     }
//     if (reports.includes("reviews")) {
//       dataSets.reviews = await Review.find()
//         .populate("property", "title")
//         .populate("user", "name")
//         .lean();
//     }

//     const exportedFiles = [];

//     /* ============================================================
//        📊 EXCEL EXPORT
//     ============================================================= */
//     if (formats.includes("excel")) {
//       const workbook = new ExcelJS.Workbook();
//       for (const [key, records] of Object.entries(dataSets)) {
//         const sheet = workbook.addWorksheet(key.toUpperCase());
//         if (records.length) {
//           const columns = Object.keys(records[0]).map((f) => ({
//             header: f.toUpperCase(),
//             key: f,
//             width: 25,
//           }));
//           sheet.columns = columns;
//           records.forEach((row) => sheet.addRow(row));
//         } else {
//           sheet.addRow(["No records found"]);
//         }
//       }
//       const excelFile = path.join(exportDir, `reports_${Date.now()}.xlsx`);
//       await workbook.xlsx.writeFile(excelFile);
//       exportedFiles.push(excelFile);
//     }

//     /* ============================================================
//        📄 CSV EXPORT
//     ============================================================= */
//     if (formats.includes("csv")) {
//       for (const [key, records] of Object.entries(dataSets)) {
//         const parser = new Parser();
//         const csv = records.length ? parser.parse(records) : "No records found";
//         const csvPath = path.join(exportDir, `${key}_${Date.now()}.csv`);
//         fs.writeFileSync(csvPath, csv);
//         exportedFiles.push(csvPath);
//       }
//     }

//     /* ============================================================
//        🧾 PDF EXPORT (Summary)
//     ============================================================= */
//     if (formats.includes("pdf")) {
//       const pdfFile = path.join(exportDir, `summary_${Date.now()}.pdf`);
//       const doc = new PDFDocument({ margin: 40 });
//       doc.pipe(fs.createWriteStream(pdfFile));
//       doc.fontSize(22).text("Reports Summary", { align: "center" });
//       doc.moveDown();
//       for (const [key, records] of Object.entries(dataSets)) {
//         doc.fontSize(16).text(`${key.toUpperCase()} (${records.length})`, {
//           underline: true,
//         });
//         doc.moveDown(0.5);
//       }
//       doc.end();
//       exportedFiles.push(pdfFile);
//     }

//     /* ============================================================
//        📦 ZIP ALL FILES TOGETHER
//     ============================================================= */
//     const zipPath = path.join(exportDir, `reports_${Date.now()}.zip`);
//     const output = fs.createWriteStream(zipPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });
//     archive.pipe(output);
//     exportedFiles.forEach((file) =>
//       archive.file(file, { name: path.basename(file) })
//     );
//     await archive.finalize();

//     /* ============================================================
//        📧 EMAIL (optional)
//     ============================================================= */
//     if (emailDelivery && emailAddress) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
//       });
//       await transporter.sendMail({
//         from: process.env.MAIL_USER,
//         to: emailAddress,
//         subject: "Reports Export",
//         text: "Attached is your reports export from the admin dashboard.",
//         attachments: [{ filename: path.basename(zipPath), path: zipPath }],
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Reports exported successfully.",
//       files: [path.basename(zipPath)],
//     });
//   } catch (error) {
//     console.error("Export Reports Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to export reports.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    ⬇️ DOWNLOAD EXPORTED FILE
// ============================================================ */
// export const downloadExportFile = async (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filePath = path.join(process.cwd(), "exports", filename);

//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({
//         success: false,
//         message: "File not found.",
//       });
//     }

//     res.download(filePath, filename, (err) => {
//       if (err) {
//         console.error("Download error:", err);
//         res
//           .status(500)
//           .json({ success: false, message: "File download failed." });
//       }
//     });
//   } catch (error) {
//     console.error("Download File Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to download file.",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    📊 REPORT SUMMARY (optional)
// ============================================================ */
// export const getReportsSummary = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalProperties = await Property.countDocuments();
//     const totalViews = await PropertyView.countDocuments();
//     const totalAppointments = await Appointment.countDocuments();

//     res.status(200).json({
//       success: true,
//       summary: {
//         totalUsers,
//         totalProperties,
//         totalViews,
//         totalAppointments,
//       },
//     });
//   } catch (error) {
//     console.error("Reports Summary Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch summary.",
//       error: error.message,
//     });
//   }
// };


import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";
import archiver from "archiver";
import nodemailer from "nodemailer";

import User from "../models/User.js";
import Property from "../models/Property.js";
import Appointment from "../models/Appointment.js";
import Lead from "../models/Lead.js";
import Review from "../models/Review.js";
import PropertyView from "../models/PropertyView.js";

/* ============================================================
   🧾 EXPORT REPORTS — supports Excel, CSV, PDF, and email ZIP
============================================================ */
export const exportReports = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const {
      formats = ["excel"],
      reports = [
        "users",
        "properties",
        "appointments",
        "leads",
        "reviews",
        "propertyViews",
      ],
      emailDelivery,
      emailAddress,
      dateRange,
    } = req.body;

    // Create export folder if missing
    const exportDir = path.join(process.cwd(), "exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Build date filter if provided
    const dateFilter = {};
    if (dateRange && dateRange.start && dateRange.end) {
      dateFilter.createdAt = {
        $gte: new Date(dateRange.start),
        $lte: new Date(dateRange.end),
      };
    }

    // Fetch data dynamically with proper formatting
    const dataSets = {};

    if (reports.includes("users")) {
      const users = await User.find(dateFilter)
        .select(
          "-password -refreshToken -resetPasswordToken -resetPasswordExpire"
        )
        .lean();
      dataSets.users = users.map((user) => ({
        _id: user._id?.toString(),
        name: user.name || "N/A",
        email: user.email || "N/A",
        phone: user.phone || "N/A",
        role: user.role || "user",
        designation: user.designation || "N/A",
        company: user.company || "N/A",
        experience: user.experience || "0",
        isActive: user.isActive ? "Yes" : "No",
        isVerified: user.isVerified ? "Yes" : "No",
        createdAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "N/A",
        lastLogin: user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString()
          : "Never",
      }));
    }

    if (reports.includes("properties")) {
      const properties = await Property.find(dateFilter)
        .populate("postedBy", "name email")
        .lean();
      dataSets.properties = properties.map((property) => ({
        _id: property._id?.toString(),
        title: property.title || "Untitled",
        price: property.price ? `₹${property.price.toLocaleString()}` : "N/A",
        status: property.status || "available",
        type: property.specifications?.type || "N/A",
        bedrooms: property.specifications?.bedrooms || 0,
        bathrooms: property.specifications?.bathrooms || 0,
        area: property.specifications?.area
          ? `${property.specifications.area} sq ft`
          : "N/A",
        city: property.location?.city || "N/A",
        postedBy: property.postedBy?.name || "N/A",
        postedByEmail: property.postedBy?.email || "N/A",
        views: property.views || 0,
        featured: property.featured ? "Yes" : "No",
        isActive: property.isActive ? "Yes" : "No",
        createdAt: property.createdAt
          ? new Date(property.createdAt).toLocaleDateString()
          : "N/A",
      }));
    }

    if (reports.includes("propertyViews")) {
      const propertyViews = await PropertyView.find(dateFilter)
        .populate("property", "title price")
        .populate("user", "name email")
        .lean();
      dataSets.propertyViews = propertyViews.map((view) => ({
        _id: view._id?.toString(),
        propertyTitle: view.property?.title || "N/A",
        propertyPrice: view.property?.price
          ? `₹${view.property.price.toLocaleString()}`
          : "N/A",
        userName: view.user?.name || "Anonymous",
        userEmail: view.user?.email || "N/A",
        ipAddress: view.ipAddress || "N/A",
        viewedAt: view.viewedAt
          ? new Date(view.viewedAt).toLocaleString()
          : "N/A",
        userAgent: view.userAgent
          ? view.userAgent.substring(0, 50) + "..."
          : "N/A",
      }));
    }

    if (reports.includes("appointments")) {
      const appointments = await Appointment.find(dateFilter)
        .populate("property", "title")
        .populate("customer", "name email")
        .populate("agent", "name email")
        .lean();
      dataSets.appointments = appointments.map((apt) => ({
        _id: apt._id?.toString(),
        propertyTitle: apt.property?.title || "N/A",
        customerName: apt.customer?.name || "N/A",
        customerEmail: apt.customer?.email || "N/A",
        agentName: apt.agent?.name || "N/A",
        date: apt.date ? new Date(apt.date).toLocaleDateString() : "N/A",
        time: apt.time || "N/A",
        status: apt.status || "scheduled",
        type: apt.type || "site-visit",
        notes: apt.notes || "N/A",
        createdAt: apt.createdAt
          ? new Date(apt.createdAt).toLocaleDateString()
          : "N/A",
      }));
    }

    if (reports.includes("leads")) {
      const leads = await Lead.find(dateFilter)
        .populate("property", "title")
        .populate("user", "name email")
        .lean();
      dataSets.leads = leads.map((lead) => ({
        _id: lead._id?.toString(),
        propertyTitle: lead.property?.title || "N/A",
        userName: lead.user?.name || "N/A",
        userEmail: lead.user?.email || lead.email || "N/A",
        userPhone: lead.user?.phone || lead.phone || "N/A",
        source: lead.source || "website",
        type: lead.type || "inquiry",
        status: lead.status || "new",
        message: lead.message ? lead.message.substring(0, 100) + "..." : "N/A",
        priority: lead.priority || "medium",
        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleDateString()
          : "N/A",
      }));
    }

    if (reports.includes("reviews")) {
      const reviews = await Review.find(dateFilter)
        .populate("property", "title")
        .populate("user", "name")
        .lean();
      dataSets.reviews = reviews.map((review) => ({
        _id: review._id?.toString(),
        propertyTitle: review.property?.title || "N/A",
        userName: review.user?.name || "Anonymous",
        rating: review.rating || 0,
        comment: review.comment
          ? review.comment.substring(0, 100) + "..."
          : "N/A",
        status: review.status || "approved",
        helpful: review.helpful || 0,
        createdAt: review.createdAt
          ? new Date(review.createdAt).toLocaleDateString()
          : "N/A",
      }));
    }

    const exportedFiles = [];

    /* ============================================================
       📊 EXCEL EXPORT
    ============================================================= */
    if (formats.includes("excel")) {
      const workbook = new ExcelJS.Workbook();

      for (const [reportName, records] of Object.entries(dataSets)) {
        const worksheet = workbook.addWorksheet(reportName.toUpperCase());

        if (records.length > 0) {
          // Get column headers from first record
          const columns = Object.keys(records[0]).map((key) => ({
            header:
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1"),
            key: key,
            width: 20,
          }));

          worksheet.columns = columns;

          // Add data rows
          records.forEach((record) => {
            worksheet.addRow(record);
          });

          // Style header row
          worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
          worksheet.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "4472C4" },
          };
        } else {
          worksheet.addRow(["No data available for this report"]);
        }
      }

      const excelFile = path.join(exportDir, `reports_${Date.now()}.xlsx`);
      await workbook.xlsx.writeFile(excelFile);
      exportedFiles.push(excelFile);
    }

    /* ============================================================
       📄 CSV EXPORT
    ============================================================= */
    if (formats.includes("csv")) {
      for (const [reportName, records] of Object.entries(dataSets)) {
        if (records.length > 0) {
          try {
            const parser = new Parser();
            const csv = parser.parse(records);
            const csvFile = path.join(
              exportDir,
              `${reportName}_${Date.now()}.csv`
            );
            fs.writeFileSync(csvFile, csv);
            exportedFiles.push(csvFile);
          } catch (error) {
            console.warn(
              `Failed to generate CSV for ${reportName}:`,
              error.message
            );
          }
        }
      }
    }

    /* ============================================================
       🧾 PDF EXPORT (Summary)
    ============================================================= */
    if (formats.includes("pdf")) {
      const pdfFile = path.join(exportDir, `reports_summary_${Date.now()}.pdf`);
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(pdfFile);
      doc.pipe(writeStream);

      // Header
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .text("REPORTS SUMMARY", { align: "center" });
      doc.moveDown();

      doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Generated on: ${new Date().toLocaleString()}`);
      doc.moveDown();

      // Summary table
      let yPosition = 150;
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("REPORT SUMMARY", 50, yPosition);
      yPosition += 30;

      for (const [reportName, records] of Object.entries(dataSets)) {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 50;
        }

        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(`${reportName.toUpperCase()}:`, 50, yPosition);
        doc
          .font("Helvetica")
          .text(` ${records.length} records`, 200, yPosition);
        yPosition += 20;
      }

      doc.end();

      // Wait for PDF to finish writing
      await new Promise((resolve) => {
        writeStream.on("finish", resolve);
      });

      exportedFiles.push(pdfFile);
    }

    /* ============================================================
       📦 ZIP ALL FILES TOGETHER
    ============================================================= */
    if (exportedFiles.length > 0) {
      const zipFileName = `reports_${Date.now()}.zip`;
      const zipPath = path.join(exportDir, zipFileName);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on("close", () => {
          console.log(`ZIP created: ${archive.pointer()} total bytes`);

          /* ============================================================
             📧 EMAIL (optional)
          ============================================================= */
          if (emailDelivery && emailAddress) {
            sendEmailWithAttachment(zipPath, emailAddress)
              .then(() => {
                cleanupFiles([...exportedFiles, zipPath]);
                res.status(200).json({
                  success: true,
                  message: `Reports exported and sent to ${emailAddress} successfully.`,
                  file: zipFileName,
                });
                resolve();
              })
              .catch((emailError) => {
                console.error("Email failed:", emailError);
                cleanupFiles(exportedFiles);
                res.status(200).json({
                  success: true,
                  message: "Reports exported but email delivery failed.",
                  file: zipFileName,
                  warning: "Email delivery failed",
                });
                resolve();
              });
          } else {
            cleanupFiles(exportedFiles); // Cleanup individual files, keep ZIP
            res.status(200).json({
              success: true,
              message: "Reports exported successfully.",
              file: zipFileName,
              downloadUrl: `/api/reports/download/${zipFileName}`,
            });
            resolve();
          }
        });

        archive.on("error", reject);
        archive.pipe(output);

        exportedFiles.forEach((file) => {
          archive.file(file, { name: path.basename(file) });
        });

        archive.finalize();
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No data available for export.",
      });
    }
  } catch (error) {
    console.error("Export Reports Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export reports.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

/* ============================================================
   📧 EMAIL HELPER FUNCTION
============================================================ */
const sendEmailWithAttachment = async (filePath, emailAddress) => {
  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RealEstate Reports" <${process.env.MAIL_USER}>`,
      to: emailAddress,
      subject: "Your Requested Reports Export",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reports Export Ready</h2>
          <p>Your requested reports export is attached to this email.</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
          <p>If you have any questions, please contact support.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: path.basename(filePath),
          path: filePath,
        },
      ],
    });
  } catch (error) {
    throw new Error(`Email delivery failed: ${error.message}`);
  }
};

/* ============================================================
   🧹 CLEANUP HELPER FUNCTION
============================================================ */
const cleanupFiles = (files) => {
  files.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    } catch (error) {
      console.warn(`Could not delete file ${file}:`, error.message);
    }
  });
};

/* ============================================================
   ⬇️ DOWNLOAD EXPORTED FILE
============================================================ */
export const downloadExportFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "exports", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    // Set appropriate headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("error", (error) => {
      console.error("File stream error:", error);
      res.status(500).json({
        success: false,
        message: "Error streaming file.",
      });
    });
  } catch (error) {
    console.error("Download File Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to download file.",
      error: error.message,
    });
  }
};

/* ============================================================
   📊 REPORT SUMMARY
============================================================ */
/* ============================================================
   📊 REPORT SUMMARY - FIXED VIEW COUNT
============================================================ */
export const getReportsSummary = async (req, res) => {
  try {
    // Get total views directly from Property model for consistency
    const totalViewsResult = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" }
        }
      }
    ]);

    const totalViews = totalViewsResult[0]?.totalViews || 0;

    const [
      totalUsers,
      totalProperties,
      totalAppointments,
      totalLeads,
      totalReviews,
      activeProperties,
      verifiedUsers,
      totalPropertyViews, // This counts individual view records
    ] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Appointment.countDocuments(),
      Lead.countDocuments(),
      Review.countDocuments(),
      Property.countDocuments({ isActive: true }),
      User.countDocuments({ isVerified: true }),
      PropertyView.countDocuments(), // Individual view tracking records
    ]);

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todayViews,
      todayAppointments,
      todayLeads,
      todayUsers,
    ] = await Promise.all([
      PropertyView.countDocuments({ viewedAt: { $gte: today, $lt: tomorrow } }),
      Appointment.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
      Lead.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
      User.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
    ]);

    res.status(200).json({
      success: true,
      summary: {
        totalUsers,
        totalProperties,
        totalViews, // This should now match your dashboard (83)
        totalPropertyViews, // This is the count of PropertyView documents
        totalAppointments,
        totalLeads,
        totalReviews,
        activeProperties,
        verifiedUsers,
        today: {
          views: todayViews,
          appointments: todayAppointments,
          leads: todayLeads,
          users: todayUsers,
        },
        // Add explanation for view counts
        viewExplanation: {
          propertyViews: "Sum of views field from all properties",
          propertyViewRecords: "Count of individual view tracking documents"
        }
      },
    });
  } catch (error) {
    console.error('Reports Summary Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch summary.',
      error: error.message,
    });
  }
};