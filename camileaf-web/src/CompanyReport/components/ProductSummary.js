import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/ProductSummary.css"; // Import the CSS file

export default function ProductSummary() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/api/v1/product/report/summary");
        setReport(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product summary");
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
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text("PRODUCT MANAGEMENT - SUMMARY REPORT", pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });

      // Summary Section
      doc.setFillColor(245, 245, 245);
      doc.rect(14, 55, pageWidth - 28, 25, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("SUMMARY OVERVIEW", 20, 65);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Products: ${report.totalProducts || 0}`, 20, 73);
      doc.text(`Total Stock: ${report.totalStock || 0}`, 20, 80);

      // Table data
      const tableRows = report.records.map((product, index) => [
        index + 1,
        product.productId || "-",
        product.productName || "-",
        product.category || "-",
        product.price != null ? `$${product.price.toFixed(2)}` : "-",
        product.stock != null ? product.stock : "-",
        product.discount != null ? `${product.discount}%` : "-",
      ]);

      // Generate table
      autoTable(doc, {
        startY: 90,
        head: [["#", "Product ID", "Product Name", "Category", "Price", "Stock", "Discount"]],
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

      doc.save(`Product_Summary_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Error generating PDF. Please try again.");
    }
  };

  // Calculate additional statistics
  const categoryCount = report?.records?.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {}) || {};

  const stockStatus = {
    low: report?.records?.filter(p => p.stock < 10).length || 0,
    medium: report?.records?.filter(p => p.stock >= 10 && p.stock < 50).length || 0,
    high: report?.records?.filter(p => p.stock >= 50).length || 0,
    out: report?.records?.filter(p => p.stock === 0).length || 0
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading product report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Report</h3>
        <p>{error || "Unable to load product data"}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="product-summary-container">
      <div className="report-header">
        <h2>Product Summary Report</h2>
        <p className="subtitle">Comprehensive overview of product inventory and performance</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card products">
          <div className="card-icon">📦</div>
          <div className="card-value">{report.totalProducts || 0}</div>
          <div className="card-label">Total Products</div>
          <div className="card-description">All products in inventory</div>
        </div>
        
        <div className="summary-card stock">
          <div className="card-icon">📊</div>
          <div className="card-value">{report.totalStock || 0}</div>
          <div className="card-label">Total Stock</div>
          <div className="card-description">Units available</div>
        </div>
        
        <div className="summary-card categories">
          <div className="card-icon">🏷️</div>
          <div className="card-value">{Object.keys(categoryCount).length}</div>
          <div className="card-label">Categories</div>
          <div className="card-description">Product categories</div>
        </div>
        
        <div className="summary-card value">
          <div className="card-icon">💰</div>
          <div className="card-value">
            {report.records?.filter(p => p.discount > 0).length || 0}
          </div>
          <div className="card-label">On Discount</div>
          <div className="card-description">Discounted products</div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="statistics-grid">
        <div className="statistics-section">
          <h3>Category Breakdown</h3>
          <div className="category-list">
            {Object.entries(categoryCount).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-count">
                  {count} ({((count / report.totalProducts) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="statistics-section">
          <h3>Stock Status</h3>
          <div className="stock-status">
            <div className="stock-item low">
              <span className="stock-label">Low Stock (&lt; 10)</span>
              <span className="stock-value">{stockStatus.low} products</span>
            </div>
            <div className="stock-item medium">
              <span className="stock-label">Medium Stock (10-49)</span>
              <span className="stock-value">{stockStatus.medium} products</span>
            </div>
            <div className="stock-item high">
              <span className="stock-label">High Stock (50+)</span>
              <span className="stock-value">{stockStatus.high} products</span>
            </div>
            <div className="stock-item out">
              <span className="stock-label">Out of Stock</span>
              <span className="stock-value">{stockStatus.out} products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="download-section">
        <div className="download-info">
          <p>Ready to download your comprehensive product report?</p>
          <p>Includes all product details, stock levels, and pricing information.</p>
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
          <h3>Product Preview ({report.records.length} total products)</h3>
          <div className="preview-table">
            <div className="table-header">
              <span>ID</span>
              <span>Product Name</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Discount</span>
            </div>
            {report.records.slice(0, 5).map((product, index) => (
              <div key={index} className="table-row">
                <span className="product-id">{product.productId}</span>
                <span className="product-name">{product.productName}</span>
                <span className="product-category">{product.category}</span>
                <span className="product-price">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
                <span className={`product-stock ${
                  product.stock < 10 ? 'stock-low' : 
                  product.stock < 50 ? 'stock-medium' : 'stock-high'
                }`}>
                  {product.stock}
                </span>
                <span className="product-discount">
                  {product.discount ? `${product.discount}%` : '0%'}
                </span>
              </div>
            ))}
            {report.records.length > 5 && (
              <div className="table-footer">
                <span>... and {report.records.length - 5} more products</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}