import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Icon from "../../../components/AppIcon";

const PerformanceChart = ({
  title,
  data,
  type = "line",
  icon,
  color = "#3B82F6",
}) => {
  const colors = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
  ];

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors?.[index % colors?.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
            <Icon
              name="Maximize2"
              size={16}
              className="text-muted-foreground"
            />
          </button>
        </div>
      </div>
      <div className="w-full" aria-label={`${title} Chart`}>
        {renderChart()}
      </div>
      {/* Legend for Pie Chart */}
      {type === "pie" && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data?.map((entry, index) => (
            <div key={entry?.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors?.[index % colors?.length] }}
              />
              <span className="text-sm text-muted-foreground">
                {entry?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;
