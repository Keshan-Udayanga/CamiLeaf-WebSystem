import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/SalesSummary.css";

export default function SalesSummary() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get("/api/v1/order/report/sales-summary");
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const generatePDF = () => {
    if (!report) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(44, 85, 48);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setTextColor(255, 255, 255);
      doc.setFontSize(15); 
      doc.setFont('helvetica', 'bold');
      doc.text("CamiLeaf Tea Factory Pvt Ltd", pageWidth / 2, 15, { align: 'center' });
      
      doc.setFontSize(10); // Smaller subtitle
      doc.setFont('helvetica', 'normal');
      doc.text("Contact: +94 11 234 5678 | Email: info@camileaf.com", pageWidth / 2, 20, { align: 'center' }); 
      
      doc.setFontSize(13); // Smaller subtitle
      doc.setFont('helvetica', 'normal');
      doc.text("Sales Summary Report", pageWidth / 2, 27, { align: 'center' }); 
      
      doc.setFontSize(9);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 32, { align: 'center' });

    // Summary
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Total Orders: ${report.totalOrders}`, 20, 60);
    doc.text(`Total Sales: Rs. ${report.totalSales.toFixed(2)}`, 20, 70);
    doc.text(`Average Order: Rs. ${(report.totalSales / report.totalOrders).toFixed(2)}`, 20, 80);

    // Table
    const tableRows = report.orders.map((order, index) => [
      index + 1,
      `#${(order._id || order.id).slice(-8)}`,
      order.fullName,
      order.city,
      order.paymentMethod.toUpperCase(),
      order.status,
      `Rs. ${order.total.toFixed(2)}`,
      order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"
    ]);

    autoTable(doc, {
      startY: 90,
      head: [["#", "Order ID", "Customer", "City", "Payment", "Status", "Amount", "Date"]],
      body: tableRows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [44, 85, 48], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });


    doc.save("Sales_Report.pdf");
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading sales data...</p>
    </div>
  );

  if (!report) return (
    <div className="error">
      <p>Failed to load report</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  const avgOrderValue = report.totalSales / report.totalOrders;

  return (
    <div className="sales-container">
      {/* Header */}
      <div className="header">
        <h1>Sales Report</h1>
        <p>Overview of sales performance</p>
      </div>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <h3>Total Orders</h3>
          <div className="value">{report.totalOrders}</div>
          <p>All processed orders</p>
        </div>
        
        <div className="card">
          <h3>Total Sales</h3>
          <div className="value">Rs. {report.totalSales.toFixed(2)}</div>
          <p>Gross revenue</p>
        </div>
        
        <div className="card">
          <h3>Average Order</h3>
          <div className="value">Rs. {avgOrderValue.toFixed(2)}</div>
          <p>Per order value</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="download-section">
        <button onClick={generatePDF} className="download-btn">
          📄 Download PDF Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat">
          <span>Orders in Report:</span>
          <strong>{report.orders.length}</strong>
        </div>
        <div className="stat">
          <span>Report Date:</span>
          <strong>{new Date().toLocaleDateString()}</strong>
        </div>
      </div>

      {/* Orders Preview */}
      <div className="preview">
        <h3>Recent Orders</h3>
        <div className="orders-list">
          {report.orders.slice(0, 6).map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-id">#{order._id?.slice(-8)}</div>
              <div className="customer">{order.fullName}</div>
              <div className="amount">Rs. {order.total.toFixed(2)}</div>
              <div className={`status ${order.status.toLowerCase()}`}>{order.status}</div>
            </div>
          ))}
        </div>
        {report.orders.length > 6 && (
          <p className="more-orders">+ {report.orders.length - 6} more orders</p>
        )}
      </div>
    </div>
  );
}