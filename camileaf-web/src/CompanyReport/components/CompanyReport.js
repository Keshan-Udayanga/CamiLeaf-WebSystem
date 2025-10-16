import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompanyReports.css";

const CompanyReports = () => {
  const navigate = useNavigate();

  const reports = [
    { name: "Geographical Distribution", route: "/admin/reports/geographical" },
    { name: "Sales Report", route: "/admin/reports/salesSummary" },
    { name: "Leaf Intake Report", route: "/admin/reports/intake-report" },
    { name: "Products Summary", route: "/admin/reports/product-report" },
    { name: "Resources Summary", route: "/admin/reports/resource-report" },
    
  ];

  return (
    <div className="reports-container">
      <h1>Company Reports</h1>
      <div className="reports-cards">
        {reports.map((report, idx) => (
          <div
            key={idx}
            className="report-card"
            onClick={() => navigate(report.route)}
          >
            <h3>{report.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyReports;
