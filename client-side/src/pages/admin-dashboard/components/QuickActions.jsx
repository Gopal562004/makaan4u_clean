import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { exportDashboardData } from "../../../lib/mongo/services/adminDashboardServices";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add Property",
      icon: "Plus",
      variant: "default",
      onClick: () => navigate("/property-listings"),
    },
    {
      label: "Generate Reports",
      icon: "FileText",
      variant: "outline",
      onClick: () => navigate("/reports-dashboard"),
    },
    {
      label: "Download Data",
      icon: "Download",
      variant: "secondary",
      onClick: async () => {
        try {
          await exportDashboardData({
            formats: ["csv"],
            emailDelivery: false,
          });
        } catch (err) {
          console.error("Download failed:", err);
          alert("Failed to download data.");
        }
      },
    },
    {
      label: "Manage Employees",
      icon: "Users",
      variant: "ghost",
      onClick: () => navigate("/appointment-management"),
    },
  ];

  return (
    <div className="bg-card border border-border rounded p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            fullWidth
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
