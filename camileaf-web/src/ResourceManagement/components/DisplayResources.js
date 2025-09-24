import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/displayResources.css";
import { Button } from "@mui/material";
import axios from "axios";
import api from "../../axiosConfig";

const ResourceTablePage = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch resources
  const fetchResources = async () => {
    try {
      const response = await api.get("/api/v1/resource/getAll");
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.get(`/api/v1/resource/delete/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Failed to delete the resource. Please try again.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const filteredResources = resources.filter(
    (res) =>
      (res.resourceId ? res.resourceId.toString().toLowerCase() : "").includes(search.toLowerCase()) ||
      (res.resourceType ? res.resourceType.toLowerCase() : "").includes(search.toLowerCase())
  );

  const getStockStatus = (quantity) => {
    if (quantity === 0) return <span style={{ color: "red" }}>Out of Stock</span>;
    if (quantity <= 50) return <span style={{ color: "orange" }}>🔔 Low Stock</span>;
    return <span style={{ color: "green" }}>In Stock</span>;
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2>Resource Stock Table</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button
            className="add-btn"
            onClick={() => navigate("/admin/resource-management/add")}
          >
            + Add New Resource
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Resource Type</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Stock Status</th>
            <th>Received Date</th>
            <th>Last Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.length === 0 ? (
            <tr>
              <td colSpan="8">No resources found.</td>
            </tr>
          ) : (
            filteredResources.map((res, index) => (
              <tr key={res.id || index}>
                <td>{index + 1}</td>
                <td>{res.resourceType}</td>
                <td>{res.quantity}</td>
                <td>{res.unit}</td>
                <td>{getStockStatus(res.quantity)}</td>
                <td>{res.addedDate ? res.addedDate.split("T")[0] : "-"}</td>
                <td>{res.lastModifiedDate ? res.lastModifiedDate.split("T")[0] : "-"}</td>
                <td>
                  <button
                    className="release-btn"
                    onClick={() =>
                      navigate(`/admin/resource-management/release/${res.id}`, { state: res })
                    }
                  >
                    Release
                  </button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ marginLeft: "10px", minWidth: "70px" }}
                    onClick={() => handleDeleteClick(res.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this resource?</p>
            <div className="confirm-actions">
              <button className="confirm-btn btn-yes" onClick={confirmDelete}>
                OK
              </button>
              <button className="confirm-btn btn-no" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceTablePage;
