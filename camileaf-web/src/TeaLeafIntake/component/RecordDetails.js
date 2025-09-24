import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/RecordDetails.css";

export default function LeafIntakeTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/v1/leafIntake/getAll");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, supplierName) => {
    if (!window.confirm(`Are you sure you want to delete the record for ${supplierName}?`)) return;

    try {
      await axios.delete(`http://localhost:8081/api/v1/leafIntake/delete/${id}`);
      setRecords(prev => prev.filter(record => record.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete record. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { class: 'status-pending', label: 'Pending' },
      'Approved': { class: 'status-approved', label: 'Approved' },
      'Rejected': { class: 'status-rejected', label: 'Rejected' }
    };
    return statusConfig[status] || { class: 'status-pending', label: status };
  };

  // Filter and sort records
  const filteredRecords = records
    .filter(record => {
      const matchesSearch = 
        record.supplierId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id?.toString().includes(searchTerm);
      
      const matchesStatus = statusFilter === "All" || record.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="header-content">
          <h1>Tea Leaf Intake Records</h1>
          <p>Manage and monitor all tea leaf intake activities</p>
        </div>
        <div className="header-actions">

        </div>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="table-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="        Search by Supplier ID, Name, or Intake ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div className="records-count">
          Showing {filteredRecords.length} of {records.length} records
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No records found</h3>
          <p>No intake records match your current filters.</p>
          {(searchTerm || statusFilter !== "All") && (
            <button 
              className="btn-clear-filters"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="records-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  Intake ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('supplierId')}>
                  Supplier ID {sortConfig.key === 'supplierId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('supplierName')}>
                  Supplier Name {sortConfig.key === 'supplierName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('intakeDate')}>
                  Intake Date & Time {sortConfig.key === 'intakeDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('weight')}>
                  Weight (Kg) {sortConfig.key === 'weight' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => {
                const statusInfo = getStatusBadge(record.status);
                return (
                  <tr key={record.id} className="table-row">
                    <td className="intake-id">{record.id}</td>
                    <td className="supplier-id">{record.supplierId}</td>
                    <td className="supplier-name">{record.supplierName}</td>
                    <td className="intake-date">
                      {record.intakeDate ? new Date(record.intakeDate).toLocaleString() : "N/A"}
                    </td>
                    <td className="weight">{record.weight} kg</td>
                    <td>
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="remarks">
                      {record.remarks || (
                        <span className="no-remarks">-</span>
                      )}
                    </td>
                    <td className="actions">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => navigate(`/admin/leaf-intake/edit/${record.id}`)}
                        title="Edit record"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(record.id, record.supplierName)}
                        title="Delete record"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}