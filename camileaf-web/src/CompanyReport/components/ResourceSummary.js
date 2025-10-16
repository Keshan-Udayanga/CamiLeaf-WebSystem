import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/ResourceSummary.css";

export default function ResourceSummary() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/api/v1/resource/report/summary");
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching resource summary:", err);
        setError("Failed to load resource summary");
        setReport(null);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const generatePDF = () => {
    if (!report || !Array.isArray(report.records) || report.records.length === 0) {
      alert("No records available to generate PDF!");
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header with background
      doc.setFillColor(63, 81, 181);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15); 
      doc.setFont('helvetica', 'bold');
      doc.text("CamiLeaf Tea Factory Pvt Ltd", pageWidth / 2, 15, { align: 'center' });
      
      doc.setFontSize(10); // Smaller subtitle
      doc.setFont('helvetica', 'normal');
      doc.text("Contact: +94 11 234 5678 | Email: info@camileaf.com", pageWidth / 2, 20, { align: 'center' }); 
      
      doc.setFontSize(15); // Smaller subtitle
      doc.setFont('helvetica', 'normal');
      doc.text("Resource Management - Summary Report", pageWidth / 2, 28, { align: 'center' }); 
      
      doc.setFontSize(9);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 33, { align: 'center' });

      // Summary Section
      doc.setFillColor(245, 245, 245);
      doc.rect(14, 55, pageWidth - 28, 25, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("SUMMARY OVERVIEW", 20, 65);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Resources: ${report.totalResources || 0}`, 20, 73);
      doc.text(`Total Quantity: ${report.totalQuantity || 0} units`, 20, 80);

      // Table data
      const tableRows = report.records.map((resource, index) => [
        index + 1,
        resource.resourceId || "-",
        resource.resourceType || "-",
        resource.quantity != null ? resource.quantity : "-",
        resource.unit || "-",
        resource.addedDate ? new Date(resource.addedDate).toLocaleDateString() : "-",
        resource.lastModifiedDate ? new Date(resource.lastModifiedDate).toLocaleDateString() : "-"
      ]);

      // Generate table
      autoTable(doc, {
        startY: 90,
        head: [["#", "Resource ID", "Resource Type", "Quantity", "Unit", "Added Date", "Last Modified"]],
        body: tableRows,
        styles: { 
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: { 
          fillColor: [22, 160, 133],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        margin: { left: 14, right: 14 }
      });

      doc.save(`Resource_Summary_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading resource report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Report</h3>
        <p>{error || "Unable to load resource data"}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="resource-summary-container">
      <div className="report-header">
        <h2>Resource Summary Report</h2>
        <p className="subtitle">Comprehensive overview of factory resources and inventory</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card resources">
          <div className="card-icon">📦</div>
          <div className="card-value">{report.totalResources || 0}</div>
          <div className="card-label">Total Resources</div>
          <div className="card-description">Different resource types</div>
        </div>
        
        <div className="summary-card quantity">
          <div className="card-icon">📊</div>
          <div className="card-value">{report.totalQuantity || 0}</div>
          <div className="card-label">Total Quantity</div>
          <div className="card-description">Units in inventory</div>
        </div>
        
        <div className="summary-card types">
          <div className="card-icon">🏷️</div>
          <div className="card-value">{Object.keys(report.resourceTypes || {}).length}</div>
          <div className="card-label">Resource Types</div>
          <div className="card-description">Different categories</div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="statistics-grid">
        <div className="statistics-section">
          <h3>Resource Types Breakdown</h3>
          <div className="type-list">
            {Object.entries(report.resourceTypes || {}).map(([type, count]) => (
              <div key={type} className="type-item">
                <span className="type-name">{type}</span>
                <span className="type-count">{count} resources</span>
              </div>
            ))}
          </div>
        </div>

        <div className="statistics-section">
          <h3>Stock Status Overview</h3>
          <div className="stock-status">
            <div className="stock-item high">
              <span className="stock-label">High Stock (50+ units)</span>
              <span className="stock-value">{report.stockStatus?.['High Stock'] || 0} resources</span>
            </div>
            <div className="stock-item medium">
              <span className="stock-label">Medium Stock (11-50 units)</span>
              <span className="stock-value">{report.stockStatus?.['Medium Stock'] || 0} resources</span>
            </div>
            <div className="stock-item low">
              <span className="stock-label">Low Stock (1-10 units)</span>
              <span className="stock-value">{report.stockStatus?.['Low Stock'] || 0} resources</span>
            </div>
            <div className="stock-item out">
              <span className="stock-label">Out of Stock</span>
              <span className="stock-value">{report.stockStatus?.['Out of Stock'] || 0} resources</span>
            </div>
          </div>
        </div>
      </div>

      <div className="download-section">
        <div className="download-info">
          <p>Ready to download your comprehensive resource report?</p>
          <p>Includes all resource details, quantities, and stock status information.</p>
        </div>
        <button 
          onClick={generatePDF} 
          className="download-btn"
          disabled={!report.records || report.records.length === 0}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Report
        </button>
      </div>

      {/* Data Preview */}
      {report.records && report.records.length > 0 && (
        <div className="data-preview">
          <h3>Resource Inventory ({report.records.length} total resources)</h3>
          <div className="preview-table">
            <div className="table-header">
              <span>Resource ID</span>
              <span>Resource Type</span>
              <span>Quantity</span>
              <span>Unit</span>
              <span>Added Date</span>
              <span>Last Modified</span>
            </div>
            {report.records.slice(0, 5).map((resource, index) => (
              <div key={index} className="table-row">
                <span className="resource-id">{resource.resourceId || resource._id}</span>
                <span className="resource-type">{resource.resourceType}</span>
                <span className="resource-quantity">{resource.quantity}</span>
                <span className="resource-unit">{resource.unit}</span>
                <span className="resource-date">
                  {resource.addedDate ? new Date(resource.addedDate).toLocaleDateString() : 'N/A'}
                </span>
                <span className="resource-date">
                  {resource.lastModifiedDate ? new Date(resource.lastModifiedDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            ))}
            {report.records.length > 5 && (
              <div className="table-footer">
                <span>... and {report.records.length - 5} more resources</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}