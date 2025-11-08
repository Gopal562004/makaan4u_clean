import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const DateRangeFilter = ({ onDateRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState("30days");
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const predefinedRanges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 3 Months" },
    { value: "1year", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    setIsCustomOpen(range === "custom");

    if (range !== "custom") {
      const endDate = new Date();
      const startDate = new Date();

      switch (range) {
        case "7days":
          startDate?.setDate(endDate?.getDate() - 7);
          break;
        case "30days":
          startDate?.setDate(endDate?.getDate() - 30);
          break;
        case "90days":
          startDate?.setDate(endDate?.getDate() - 90);
          break;
        case "1year":
          startDate?.setFullYear(endDate?.getFullYear() - 1);
          break;
      }

      onDateRangeChange?.({ startDate, endDate, range });
    }
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      onDateRangeChange?.({
        startDate: new Date(customStartDate),
        endDate: new Date(customEndDate),
        range: "custom",
      });
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-foreground flex items-center space-x-2">
          <Icon name="Calendar" size={18} />
          <span>Date Range</span>
        </h4>
      </div>
      <div className="space-y-2">
        {predefinedRanges?.map((range) => (
          <button
            key={range?.value}
            onClick={() => handleRangeChange(range?.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth ${
              selectedRange === range?.value
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            }`}
          >
            {range?.label}
          </button>
        ))}
      </div>
      {isCustomOpen && (
        <div className="mt-4 p-3 border border-border rounded-lg bg-muted/30">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button
              onClick={handleCustomDateSubmit}
              disabled={!customStartDate || !customEndDate}
              size="sm"
              fullWidth
            >
              Apply Custom Range
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
