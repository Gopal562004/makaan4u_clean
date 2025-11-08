// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";

// const PropertyChart = ({ type = "bar", data, title, height = 300 }) => {
//   const chartData = [
//     { month: "Jan", sales: 45, revenue: 2400000, leads: 120 },
//     { month: "Feb", sales: 52, revenue: 2800000, leads: 135 },
//     { month: "Mar", sales: 48, revenue: 2600000, leads: 128 },
//     { month: "Apr", sales: 61, revenue: 3200000, leads: 145 },
//     { month: "May", sales: 55, revenue: 2900000, leads: 132 },
//     { month: "Jun", sales: 67, revenue: 3500000, leads: 158 },
//     { month: "Jul", sales: 59, revenue: 3100000, leads: 142 },
//     { month: "Aug", sales: 72, revenue: 3800000, leads: 165 },
//     { month: "Sep", sales: 68, revenue: 3600000, leads: 152 },
//     { month: "Oct", sales: 75, revenue: 3900000, leads: 170 },
//   ];

//   const formatValue = (value, name) => {
//     if (name === "revenue") {
//       return `₹${(value / 100000)?.toFixed(1)}L`;
//     }
//     return value;
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload?.length) {
//       return (
//         <div className="bg-popover border border-border rounded-lg p-3 shadow-moderate">
//           <p className="font-medium text-foreground mb-2">{label}</p>
//           {payload?.map((entry, index) => (
//             <p key={index} className="text-sm" style={{ color: entry?.color }}>
//               {`${entry?.name}: ${formatValue(entry?.value, entry?.dataKey)}`}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
//       <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
//       <div style={{ width: "100%", height }}>
//         <ResponsiveContainer>
//           {type === "bar" ? (
//             <BarChart data={data || chartData}>
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="var(--color-border)"
//               />
//               <XAxis
//                 dataKey="month"
//                 stroke="var(--color-muted-foreground)"
//                 fontSize={12}
//               />
//               <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar
//                 dataKey="sales"
//                 fill="var(--color-primary)"
//                 radius={[4, 4, 0, 0]}
//                 name="Sales"
//               />
//             </BarChart>
//           ) : (
//             <LineChart data={data || chartData}>
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="var(--color-border)"
//               />
//               <XAxis
//                 dataKey="month"
//                 stroke="var(--color-muted-foreground)"
//                 fontSize={12}
//               />
//               <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
//               <Tooltip content={<CustomTooltip />} />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="var(--color-secondary)"
//                 strokeWidth={3}
//                 dot={{ fill: "var(--color-secondary)", strokeWidth: 2, r: 4 }}
//                 name="Revenue"
//               />
//             </LineChart>
//           )}
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PropertyChart;
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
        <div className="bg-popover border border-border rounded-lg p-3 shadow-moderate">
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
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
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
