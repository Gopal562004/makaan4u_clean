import React from "react";
import Icon from "../../../components/AppIcon";

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-smooth"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat?.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {stat?.value}
              </p>
              {stat?.change && (
                <div
                  className={`flex items-center space-x-1 mt-2 text-sm ${
                    stat?.changeType === "positive"
                      ? "text-success"
                      : stat?.changeType === "negative"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon
                    name={
                      stat?.changeType === "positive"
                        ? "TrendingUp"
                        : stat?.changeType === "negative"
                        ? "TrendingDown"
                        : "Minus"
                    }
                    size={16}
                  />
                  <span>{stat?.change}</span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              )}
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}
            >
              <Icon name={stat?.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
