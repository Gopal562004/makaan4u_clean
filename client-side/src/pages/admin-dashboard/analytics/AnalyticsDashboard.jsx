import React, { useEffect, useState, useMemo } from "react";
import { fetchSalesTrend, getReportsSummary } from "../../../lib/mongo/services/adminDashboardServices";
import PropertyChart from "../components/PropertyChart";
import MetricsCard from "../components/MetricsCard";
import Icon from "../../../components/AppIcon";

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [salesTrend, setSalesTrend] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const [trendData, summaryData] = await Promise.all([
          fetchSalesTrend(),
          getReportsSummary()
        ]);
        
        setSalesTrend(trendData?.trend || []);
        setSummary(summaryData?.summary || null);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
  }, []);

  const chartComponents = useMemo(
    () => [
      {
        title: "Platform Revenue Analytics",
        data: salesTrend,
        type: "line",
        height: 350,
      },
      {
        title: "Property Sales Volume",
        data: salesTrend,
        type: "bar",
        height: 350,
      },
    ],
    [salesTrend]
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground flex justify-center items-center h-64">
        <Icon name="Loader2" className="animate-spin mr-2" />
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Deep dive into platform performance and metrics.</p>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Users"
            value={summary.totalUsers}
            change={`+${summary.today?.users || 0} today`}
            changeType="positive"
            icon="Users"
            color="primary"
          />
          <MetricsCard
            title="Total Properties"
            value={summary.totalProperties}
            change={`${summary.activeProperties} active`}
            changeType="neutral"
            icon="Building2"
            color="secondary"
          />
          <MetricsCard
            title="Total Appointments"
            value={summary.totalAppointments}
            change={`+${summary.today?.appointments || 0} today`}
            changeType="positive"
            icon="Calendar"
            color="warning"
          />
          <MetricsCard
            title="Total Leads"
            value={summary.totalLeads}
            change={`+${summary.today?.leads || 0} today`}
            changeType="positive"
            icon="Target"
            color="success"
          />
        </div>
      )}

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
      
      <div className="bg-card border border-border rounded p-6 shadow-subtle">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/30 rounded text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Views</p>
            <p className="text-2xl font-bold">{summary?.totalViews || 0}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded text-center">
            <p className="text-sm text-muted-foreground mb-1">Today's Views</p>
            <p className="text-2xl font-bold">{summary?.today?.views || 0}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
            <p className="text-2xl font-bold">{summary?.totalReviews || 0}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded text-center">
            <p className="text-sm text-muted-foreground mb-1">Verified Users</p>
            <p className="text-2xl font-bold">{summary?.verifiedUsers || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;