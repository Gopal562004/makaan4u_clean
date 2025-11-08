// import React, { useState } from "react";
// import Icon from "../../../components/AppIcon";
// import Button from "../../../components/ui/Button";
// import { Checkbox } from "../../../components/ui/Checkbox";

// const ExportModal = ({ isOpen, onClose, reportData, onExport }) => {
//   const [selectedFormats, setSelectedFormats] = useState(["pdf"]);
//   const [selectedReports, setSelectedReports] = useState([]);
//   const [emailDelivery, setEmailDelivery] = useState(false);
//   const [emailAddress, setEmailAddress] = useState("");

//   const exportFormats = [
//     {
//       id: "pdf",
//       label: "PDF Document",
//       icon: "FileText",
//       description: "Best for presentations and sharing",
//     },
//     {
//       id: "excel",
//       label: "Excel Spreadsheet",
//       icon: "FileSpreadsheet",
//       description: "Best for data analysis",
//     },
//     {
//       id: "csv",
//       label: "CSV File",
//       icon: "Database",
//       description: "Best for data processing",
//     },
//   ];

//   const handleFormatToggle = (formatId) => {
//     setSelectedFormats((prev) =>
//       prev?.includes(formatId)
//         ? prev?.filter((id) => id !== formatId)
//         : [...prev, formatId]
//     );
//   };

//   const handleReportToggle = (reportId) => {
//     setSelectedReports((prev) =>
//       prev?.includes(reportId)
//         ? prev?.filter((id) => id !== reportId)
//         : [...prev, reportId]
//     );
//   };

//   const handleSelectAllReports = () => {
//     if (selectedReports?.length === reportData?.length) {
//       setSelectedReports([]);
//     } else {
//       setSelectedReports(reportData?.map((report) => report?.id));
//     }
//   };

//   const handleExport = () => {
//     const exportConfig = {
//       formats: selectedFormats,
//       reports:
//         selectedReports?.length > 0
//           ? selectedReports
//           : reportData?.map((r) => r?.id),
//       emailDelivery,
//       emailAddress: emailDelivery ? emailAddress : null,
//     };

//     onExport(exportConfig);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
//       <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-border">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//               <Icon name="Download" size={20} className="text-primary" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-foreground">
//                 Export Reports
//               </h2>
//               <p className="text-sm text-muted-foreground">
//                 Choose format and delivery options
//               </p>
//             </div>
//           </div>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <Icon name="X" size={20} />
//           </Button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Export Formats */}
//           <div>
//             <h3 className="font-medium text-foreground mb-3">Export Formats</h3>
//             <div className="space-y-3">
//               {exportFormats?.map((format) => (
//                 <div
//                   key={format?.id}
//                   className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth"
//                 >
//                   <Checkbox
//                     checked={selectedFormats?.includes(format?.id)}
//                     onChange={() => handleFormatToggle(format?.id)}
//                   />
//                   <div className="flex items-center space-x-3 flex-1">
//                     <Icon
//                       name={format?.icon}
//                       size={20}
//                       className="text-muted-foreground"
//                     />
//                     <div>
//                       <p className="font-medium text-foreground">
//                         {format?.label}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {format?.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Report Selection */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-medium text-foreground">Select Reports</h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleSelectAllReports}
//               >
//                 {selectedReports?.length === reportData?.length
//                   ? "Deselect All"
//                   : "Select All"}
//               </Button>
//             </div>
//             <div className="space-y-2 max-h-48 overflow-y-auto">
//               {reportData?.map((report) => (
//                 <div
//                   key={report?.id}
//                   className="flex items-center space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-smooth"
//                 >
//                   <Checkbox
//                     checked={selectedReports?.includes(report?.id)}
//                     onChange={() => handleReportToggle(report?.id)}
//                   />
//                   <div className="flex items-center space-x-3 flex-1">
//                     <div
//                       className={`w-8 h-8 rounded-lg flex items-center justify-center ${report?.color}`}
//                     >
//                       <Icon name={report?.icon} size={16} color="white" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-foreground">
//                         {report?.title}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {report?.recordCount?.toLocaleString()} records
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Email Delivery */}
//           <div className="p-4 bg-muted/30 rounded-lg border border-border">
//             <div className="flex items-center space-x-3 mb-3">
//               <Checkbox
//                 checked={emailDelivery}
//                 onChange={(e) => setEmailDelivery(e?.target?.checked)}
//               />
//               <div>
//                 <p className="font-medium text-foreground">Email Delivery</p>
//                 <p className="text-sm text-muted-foreground">
//                   Send reports directly to email
//                 </p>
//               </div>
//             </div>

//             {emailDelivery && (
//               <div className="mt-3">
//                 <input
//                   type="email"
//                   placeholder="Enter email address"
//                   value={emailAddress}
//                   onChange={(e) => setEmailAddress(e?.target?.value)}
//                   className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
//           <div className="text-sm text-muted-foreground">
//             {selectedFormats?.length} format(s) •{" "}
//             {selectedReports?.length || reportData?.length} report(s)
//           </div>
//           <div className="flex space-x-3">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               variant="default"
//               iconName="Download"
//               iconPosition="left"
//               onClick={handleExport}
//               disabled={selectedFormats?.length === 0}
//             >
//               Export Reports
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExportModal;
import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const ExportModal = ({ isOpen, onClose, reportData, onExport }) => {
  const [selectedFormats, setSelectedFormats] = useState(["pdf"]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [emailDelivery, setEmailDelivery] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  const exportFormats = [
    {
      id: "pdf",
      label: "PDF",
      icon: "FileText",
      description: "For presentations",
    },
    {
      id: "excel",
      label: "Excel",
      icon: "FileSpreadsheet",
      description: "For analysis",
    },
    {
      id: "csv",
      label: "CSV",
      icon: "Database",
      description: "For processing",
    },
  ];

  const toggleFormat = (formatId) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((id) => id !== formatId)
        : [...prev, formatId]
    );
  };

  const toggleReport = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const selectAllReports = () => {
    setSelectedReports(
      selectedReports.length === reportData.length
        ? []
        : reportData.map((r) => r.id)
    );
  };

  const handleExport = () => {
    onExport({
      formats: selectedFormats,
      reports:
        selectedReports.length > 0
          ? selectedReports
          : reportData.map((r) => r.id),
      emailDelivery,
      emailAddress: emailDelivery ? emailAddress : null,
    });
    onClose();
  };

  if (!isOpen) return null;

  const selectedCount = selectedReports.length || reportData.length;
  const formatCount = selectedFormats.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-md max-h-[70vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header - Compact */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Export Reports
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 hover:bg-muted"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Format Selection */}
          <section>
            <h3 className="font-medium text-foreground text-sm mb-2">Format</h3>
            <div className="grid gap-1">
              {exportFormats.map((format) => (
                <label
                  key={format.id}
                  className="flex items-center gap-2 p-2 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedFormats.includes(format.id)}
                    onChange={() => toggleFormat(format.id)}
                    className="h-4 w-4"
                  />
                  <Icon
                    name={format.icon}
                    size={16}
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">
                      {format.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {format.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Report Selection */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground text-sm">Reports</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAllReports}
                className="h-7 text-xs px-2"
              >
                {selectedReports.length === reportData.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {reportData.map((report) => (
                <label
                  key={report.id}
                  className="flex items-center gap-2 p-2 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedReports.includes(report.id)}
                    onChange={() => toggleReport(report.id)}
                    className="h-4 w-4"
                  />
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center ${report.color}`}
                  >
                    <Icon name={report.icon} size={12} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {report.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {report.recordCount?.toLocaleString()} records
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Email Delivery */}
          <section className="bg-muted/30 rounded-lg border border-border p-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={emailDelivery}
                onChange={(e) => setEmailDelivery(e.target.checked)}
                className="h-4 w-4"
              />
              <div>
                <p className="font-medium text-foreground text-sm">
                  Email Delivery
                </p>
                <p className="text-xs text-muted-foreground">Send to email</p>
              </div>
            </label>

            {emailDelivery && (
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}
          </section>
        </div>

        {/* Footer - Compact */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground">
            {formatCount} format{formatCount !== 1 ? "s" : ""} • {selectedCount}{" "}
            report{selectedCount !== 1 ? "s" : ""}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={handleExport}
              disabled={selectedFormats.length === 0}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;