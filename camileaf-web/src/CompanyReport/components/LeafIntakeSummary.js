import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/LeafIntakeSummary.css"; // We'll create this CSS file

export default function LeafIntakeSummary() {
    
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get("/api/v1/leafIntake/report/summary");
                setReport(res.data);
            } catch (err) {
                console.error("Error fetching leaf intake summary:", err);
                setError("Failed to load leaf intake summary");
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    const generatePDF = () => {
        if (!report || !report.records || report.records.length === 0) {
            alert("No data available to generate PDF!");
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
            doc.text("TEA FACTORY - LEAF INTAKE SUMMARY", pageWidth / 2, 20, { align: 'center' });

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
            doc.text(`Total Records: ${report.totalRecords}`, 20, 73);
            doc.text(`Total Weight: ${report.totalWeight.toFixed(2)} Kg`, 20, 80);

            // Table data
            const tableRows = report.records.map((record, index) => [
                index + 1,
                record.supplierId || "N/A",
                record.supplierName || "N/A",
                record.intakeDate ? new Date(record.intakeDate).toLocaleDateString() : "N/A",
                `${record.weight} Kg`,
                record.status || "Unknown",
                record.remarks || "-",
            ]);

            // Generate table
            autoTable(doc, {
                startY: 90,
                head: [["#", "Supplier ID", "Supplier Name", "Intake Date", "Weight", "Status", "Remarks"]],
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

            // Footer
            const finalY = doc.lastAutoTable.finalY + 10;
            if (finalY < 280) {
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Confidential - For Internal Use Only", pageWidth / 2, 290, { align: 'center' });
            }

            doc.save(`Leaf_Intake_Report_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (err) {
            console.error("Error generating PDF:", err);
            alert("Error generating PDF. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading leaf intake summary...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="leaf-intake-container">
            <div className="report-header">
                <h2>Leaf Intake Summary Report</h2>
                <p className="subtitle">Comprehensive overview of leaf intake records</p>
            </div>

            <div className="summary-cards">
                <div className="summary-card total-records">
                    <div className="card-label">Total Records</div>
                    <div className="card-value">{report.totalRecords}</div>
                    <div className="card-description">All intake records</div>
                </div>

                <div className="summary-card total-weight">
                    <div className="card-label">Total Weight</div>
                    <div className="card-value">{report.totalWeight.toFixed(2)} Kg</div>
                    <div className="card-description">Total leaf intake</div>
                </div>
            </div>

            <div className="status-breakdown">
                <h3>Status Breakdown</h3>
                <div className="status-list">
                    {Object.entries(report.statusCount).map(([status, count]) => (
                        <div key={status} className="status-item">
                            <span className="status-name">{status}</span>
                            <span className="status-count">{count} records</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="action-section">
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

            {/* Data table preview */}
            {report.records && report.records.length > 0 && (
                <div className="data-preview">
                    <h3>Recent Records ({report.records.length} total)</h3>
                    <div className="preview-table">
                        <div className="table-header">
                            <span>Supplier</span>
                            <span>Date</span>
                            <span>Weight</span>
                            <span>Status</span>
                        </div>
                        {report.records.slice(0, 5).map((record, index) => (
                            <div key={index} className="table-row">
                                <span>{record.supplierName}</span>
                                <span>{new Date(record.intakeDate).toLocaleDateString()}</span>
                                <span>{record.weight} Kg</span>
                                <span className={`status-badge status-${record.status?.toLowerCase()}`}>
                                    {record.status}
                                </span>
                            </div>
                        ))}
                        {report.records.length > 5 && (
                            <div className="table-footer">
                                <span>... and {report.records.length - 5} more records</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}