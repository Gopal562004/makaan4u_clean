import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import { fetchRecentActivity } from "../../../lib/mongo/services/adminDashboardServices";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Map activity types to colors and icons
  const activityConfig = {
    appointment: { icon: "Calendar", color: "text-primary" },
    lead: { icon: "UserPlus", color: "text-success" },
    property: { icon: "Home", color: "text-warning" },
    employee: { icon: "User", color: "text-secondary" },
    system: { icon: "FileText", color: "text-muted-foreground" },
    default: { icon: "Bell", color: "text-muted-foreground" },
  };

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const res = await fetchRecentActivity();
        setActivities(res?.activities || []);
      } catch (err) {
        console.error("Error loading recent activities:", err);
        setError("Failed to load recent activities.");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <Icon name="Loader2" className="animate-spin inline-block mr-2" />
        Loading recent activity...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <Icon name="AlertTriangle" className="inline-block mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-6">
            <Icon
              name="Inbox"
              className="inline-block mb-2 opacity-60"
              size={20}
            />
            <p>No recent activities available.</p>
          </div>
        ) : (
          activities.map((activity) => {
            const config =
              activityConfig[activity.type] || activityConfig.default;

            return (
              <div
                key={activity._id || activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-all"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${config.color}`}
                >
                  <Icon name={config.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title || "New Activity"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {activity.description || "No description provided."}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {activity.time
                      ? activity.time
                      : new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
