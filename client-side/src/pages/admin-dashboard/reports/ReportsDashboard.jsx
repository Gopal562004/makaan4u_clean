import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import ExportModal from "../components/ExportModal";
import adminDashboardServices from "../../../lib/mongo/services/adminDashboardServices";
import Icon from "../../../components/AppIcon";

const ReportsDashboard = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalViews: 0,
    totalAppointments: 0,
    totalLeads: 0,
    totalReviews: 0,
  });
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch once on mount, no re-renders or loops
  useEffect(() => {
    let ignore = false;

    const fetchSummary = async () => {
      try {
        const data = await adminDashboardServices.getReportsSummary();
        if (!ignore && data?.summary) {
          setSummary(data.summary);
        }
      } catch (err) {
        console.error("Failed to fetch reports summary:", err);
        setError("Unable to load summary data.");
      } finally {
        if (!ignore) setLoadingSummary(false);
      }
    };

    fetchSummary();
    return () => {
      ignore = true; // cleanup flag to prevent setState after unmount
    };
  }, []); // ✅ empty deps → runs once

  // 🔹 Report summary cards (static definitions)
  const reportData = [
    {
      id: "properties",
      title: "Property Reports",
      icon: "Home",
      color: "bg-primary",
      recordCount: summary.totalProperties,
    },
    {
      id: "propertyViews",
      title: "Property Views",
      icon: "Eye",
      color: "bg-secondary",
      recordCount: summary.totalViews,
    },
    {
      id: "users",
      title: "User Registrations",
      icon: "UserPlus",
      color: "bg-success",
      recordCount: summary.totalUsers,
    },
    {
      id: "appointments",
      title: "Appointments",
      icon: "Calendar",
      color: "bg-warning",
      recordCount: summary.totalAppointments,
    },
    {
      id: "leads",
      title: "Leads",
      icon: "MessageSquare",
      color: "bg-muted",
      recordCount: summary.totalLeads,
    },
    {
      id: "reviews",
      title: "User Reviews",
      icon: "Star",
      color: "bg-info",
      recordCount: summary.totalReviews,
    },
  ];

  // ✅ Handle export (no reload, no looping)
  const handleExport = async (config) => {
    setLoading(true);
    try {
      await adminDashboardServices.exportReportsData(config);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export reports. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingSummary) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading reports summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">{error}</div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Reports Dashboard
        </h1>
        <Button
          iconName="Download"
          onClick={() => setIsExportOpen(true)}
          disabled={loading}
        >
          {loading ? "Exporting..." : "Export Reports"}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportData.map((report) => (
          <div
            key={report.id}
            className="p-5 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${report.color}`}
              >
                <Icon name={report.icon} size={20} color="white" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                {report.title}
              </h3>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {report.recordCount?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total records</p>
          </div>
        ))}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportData={reportData}
        onExport={handleExport}
      />
    </div>
  );
};

export default ReportsDashboard;
