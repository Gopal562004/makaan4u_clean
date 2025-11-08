import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ReportCard = ({ report, onGenerate, onDownload, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "text-success bg-success/10";
      case "generating":
        return "text-warning bg-warning/10";
      case "failed":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ready":
        return "CheckCircle";
      case "generating":
        return "Clock";
      case "failed":
        return "XCircle";
      default:
        return "FileText";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${report?.color}`}
          >
            <Icon name={report?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{report?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {report?.description}
            </p>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
            report?.status
          )}`}
        >
          <Icon name={getStatusIcon(report?.status)} size={12} />
          <span className="capitalize">{report?.status}</span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last Generated:</span>
          <span className="text-foreground">{report?.lastGenerated}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Records:</span>
          <span className="text-foreground">
            {report?.recordCount?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">File Size:</span>
          <span className="text-foreground">{report?.fileSize}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        {report?.status === "ready" ? (
          <>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onView(report)}
              className="flex-1"
            >
              View
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => onDownload(report)}
              className="flex-1"
            >
              Download
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={() => onGenerate(report)}
            disabled={report?.status === "generating"}
            loading={report?.status === "generating"}
            fullWidth
          >
            {report?.status === "generating"
              ? "Generating..."
              : "Generate Report"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
