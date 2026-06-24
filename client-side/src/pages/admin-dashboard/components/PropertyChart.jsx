import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Icon from "../../../components/AppIcon";

const PropertyChart = ({
  type = "bar",
  data = [],
  title = "Property Sales & Revenue Trend",
  height = 300,
}) => {
  // ✅ If backend data is missing, show fallback UI
  const isEmpty = !data || data.length === 0;

  const formatValue = (value, name) => {
    if (name === "revenue") {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded p-3 shadow-moderate">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${formatValue(entry.value, entry.dataKey)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
          <Icon name="BarChart3" size={40} className="mb-3 opacity-70" />
          <p>No chart data available yet.</p>
        </div>
      ) : (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(v) => `${v / 100000}L`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="sales"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                  name="Sales Count"
                />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(v) => `${v / 100000}L`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-secondary)"
                  strokeWidth={3}
                  dot={{
                    fill: "var(--color-secondary)",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  name="Revenue (₹)"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PropertyChart;
