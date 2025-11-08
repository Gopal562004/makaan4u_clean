import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentReports = ({ reports, onDownload, onShare, onDelete }) => {
  const getFileIcon = (format) => {
    switch (format) {
      case "pdf":
        return "FileText";
      case "excel":
        return "FileSpreadsheet";
      case "csv":
        return "Database";
      default:
        return "File";
    }
  };

  const getFileColor = (format) => {
    switch (format) {
      case "pdf":
        return "text-red-600 bg-red-100";
      case "excel":
        return "text-green-600 bg-green-100";
      case "csv":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + " " + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Recent Reports</h3>
            <p className="text-sm text-muted-foreground">
              Previously generated reports
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
          More
        </Button>
      </div>
      <div className="space-y-3">
        {reports?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon
                name="FileText"
                size={24}
                className="text-muted-foreground"
              />
            </div>
            <p className="text-muted-foreground">No recent reports found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generate your first report to see it here
            </p>
          </div>
        ) : (
          reports?.map((report) => (
            <div
              key={report?.id}
              className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(
                  report?.format
                )}`}
              >
                <Icon name={getFileIcon(report?.format)} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground truncate">
                    {report?.name}
                  </h4>
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full uppercase">
                    {report?.format}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{report?.generatedDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="HardDrive" size={14} />
                    <span>{formatFileSize(report?.fileSize)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{report?.downloadCount} downloads</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Download"
                  onClick={() => onDownload(report)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Share2"
                  onClick={() => onShare(report)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  onClick={() => onDelete(report)}
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          ))
        )}
      </div>
      {reports?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="Archive">
            View All Reports Archive
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentReports;
