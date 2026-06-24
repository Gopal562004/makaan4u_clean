import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetricsCard from "../components/MetricsCard";
import PropertyChart from "../components/PropertyChart";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import PropertyStatusOverview from "../components/PropertyStatusOverview";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

// ✅ Import all admin service functions
import {
  fetchDashboardStats,
  fetchSalesTrend,
  fetchPropertyStatusOverview,
  fetchRecentActivity,
  exportDashboardData,
  fetchQuickActionsSummary,
} from "../../../lib/mongo/services/adminDashboardServices";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ States
  const [metricsData, setMetricsData] = useState([]);
  const [salesTrendData, setSalesTrendData] = useState([]);
  const [propertyStatusData, setPropertyStatusData] = useState([]);
  const [recentActivity, setRecentActivity] = useState({
    properties: [],
    appointments: [],
  });
  const [quickActions, setQuickActions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch data from backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, trendRes, propertyRes, recentRes, quickRes] =
        await Promise.all([
          fetchDashboardStats(),
          fetchSalesTrend(),
          fetchPropertyStatusOverview(),
          fetchRecentActivity(),
          fetchQuickActionsSummary(),
        ]);

      // Metrics (Top Cards)
      const stats = statsRes?.stats || {};
      const metrics = [
        {
          title: "Total Users",
          value: stats?.users?.total?.toLocaleString() || "0",
          change: "+0%",
          changeType: "neutral",
          icon: "Users",
          color: "primary",
        },
        {
          title: "Total Properties",
          value: stats?.properties?.total?.toLocaleString() || "0",
          change: "+0%",
          changeType: "neutral",
          icon: "Building2",
          color: "success",
        },
        {
          title: "Active Listings",
          value:
            stats?.properties?.byStatus
              ?.find((s) => s._id === "active")
              ?.count?.toLocaleString() || "0",
          change: "+0%",
          changeType: "neutral",
          icon: "Home",
          color: "warning",
        },
        {
          title: "Appointments",
          value: stats?.appointments?.total?.toLocaleString() || "0",
          change: "+0%",
          changeType: "neutral",
          icon: "Calendar",
          color: "secondary",
        },
        {
          title: "Total Leads",
          value: stats?.leads?.total?.toLocaleString() || "0",
          change: "+0%",
          changeType: "neutral",
          icon: "Target",
          color: "primary",
        },
        {
          title: "Total Revenue",
          value: `₹${((stats?.revenue?.totalRevenue || 0) / 100000).toFixed(
            2
          )}L`,
          change: "+0%",
          changeType: "neutral",
          icon: "TrendingUp",
          color: "success",
        },
      ];

      setMetricsData(metrics);
      setSalesTrendData(trendRes?.trend || []);
      setPropertyStatusData(propertyRes?.propertyStatus || []);
      setRecentActivity({
        properties: recentRes?.recentProperties || [],
        appointments: recentRes?.recentAppointments || [],
      });
      setQuickActions(quickRes?.summary || {});
    } catch (err) {
      console.error("❌ Error loading dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Refresh Button
  const handleRefresh = () => fetchDashboardData();

  // ✅ Export Button
  const handleExportData = async () => {
    try {
      await exportDashboardData({
        formats: ["pdf", "excel"],
        emailDelivery: false,
      });
      toast.success("✅ Data export successful!");
    } catch (err) {
      console.error("❌ Export failed:", err);
      toast.error("Export failed. Please check backend logs.");
    }
  };

  // ✅ Chart Components
  const chartComponents = useMemo(
    () => [
      {
        title: "Property Sales Trend (Monthly)",
        data: salesTrendData,
        type: "bar",
        height: 300,
      },
      {
        title: "Revenue Analytics",
        data: salesTrendData,
        type: "line",
        height: 300,
      },
    ],
    [salesTrendData]
  );

  // ✅ Loading & Error States
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Icon name="Loader2" className="animate-spin inline-block mr-2" />
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <Icon name="AlertTriangle" className="inline-block mr-2" />
        {error}
      </div>
    );
  }

  // ✅ Render Dashboard
  return (
    <div className="p-6 lg:p-8">
      {/* ==================== HEADER ==================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, <span className="font-semibold">Rajesh Patel</span>!
            Here’s the latest performance insights from your platform.
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={handleRefresh}
          >
            Refresh
          </Button>

          <Button
            iconName="Download"
            iconPosition="left"
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* ==================== METRICS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metricsData.map((metric, index) => (
          <MetricsCard
            key={`${metric.title}-${index}`}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* ==================== SALES TRENDS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {chartComponents.map((chart) => (
          <PropertyChart
            key={chart.title}
            type={chart.type}
            data={chart.data}
            title={chart.title}
            height={chart.height}
          />
        ))}
      </div>

      {/* ==================== PROPERTY STATUS ==================== */}
      <div className="mb-8">
        <PropertyStatusOverview data={propertyStatusData} />
      </div>

      {/* ==================== QUICK ACTIONS + RECENT ACTIVITY ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActions data={quickActions} />
        <RecentActivity data={recentActivity} />
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
