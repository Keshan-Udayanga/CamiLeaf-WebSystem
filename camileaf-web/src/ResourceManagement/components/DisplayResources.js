import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/displayResources.css";
import { Button } from "@mui/material";
import axios from "axios";

const ResourceTablePage = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch resources (moved outside useEffect so it can be reused)
  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/resource/getAll");
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Delete resource
  const handleDelete = async (resourceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
    if (!confirmDelete) return;

    try {
      await axios.get(`http://localhost:8081/api/v1/resource/delete/${resourceId}`);
      alert("Resource deleted successfully!");
      fetchResources(); // refresh table after deletion
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Failed to delete the resource. Please try again.");
    }
  };

  // Filter resources by search
  const filteredResources = resources.filter((res) =>
    (res.resourceId ? res.resourceId.toString().toLowerCase() : "").includes(search.toLowerCase()) ||
    (res.resourceType ? res.resourceType.toLowerCase() : "").includes(search.toLowerCase())
  );

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
            <th>Received Date</th>
            <th>Last Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.length === 0 ? (
            <tr>
              <td colSpan="7">No resources found.</td>
            </tr>
          ) : (
            filteredResources.map((res, index) => (
              <tr key={res.id || index}>
                <td>{index + 1}</td>
                <td>{res.resourceType}</td>
                <td>{res.quantity}</td>
                <td>{res.unit}</td>
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
                  <Button variant="contained" color="error" size="small" sx={{ marginLeft: "10px", minWidth: "70px" }}
                    onClick={() => handleDelete(res.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTablePage;
