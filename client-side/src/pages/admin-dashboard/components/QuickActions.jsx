import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

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
      onClick: () => {
        // Mock download functionality
        const link = document.createElement("a");
        link.href =
          "data:text/csv;charset=utf-8,Property ID,Name,Price,Status\n1,Luxury Villa,₹2.5Cr,Active\n2,Modern Apartment,₹85L,Sold";
        link.download = "properties_data.csv";
        link?.click();
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
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
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
