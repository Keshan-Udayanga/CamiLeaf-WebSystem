import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ReleaseForm.css";

const ResourceReleaseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state; // passed from table

  const [release, setRelease] = useState({
    resourceId: resource?.id || "",
    resourceType: resource?.resourceType || "",
    currentQuantity: resource?.quantity || 0,
    releaseQuantity: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setRelease({ ...release, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qtyToRelease = parseInt(release.releaseQuantity, 10);

    if (qtyToRelease <= 0) {
      alert("Release quantity must be greater than 0!");
      return;
    }

    if (qtyToRelease > release.currentQuantity) {
      alert("Not enough stock to release!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/resource/release/${release.resourceId}`,
        { releaseQuantity: qtyToRelease }
      );

      alert(
        `Released ${qtyToRelease} ${resource.unit} of ${resource.resourceType} successfully!`
      );

      // Navigate back and pass updated resource to table page
      navigate("/admin/resource-management", { state: { updatedResource: response.data } });
    } catch (error) {
      console.error("Error releasing resource:", error);
      alert("Failed to release resource. Please try again.");
    }
  };

  return (
    <div className="release-form-container">
      <h3>Release Resource</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Resource ID
          <input type="text" value={release.resourceId} disabled />
        </label>

        <label>
          Resource Type
          <input type="text" value={release.resourceType} disabled />
        </label>

        <label>
          Current Quantity
          <input type="number" value={release.currentQuantity} disabled />
        </label>

        <label>
          Quantity to Release ({resource.unit})
          <input
            type="number"
            name="releaseQuantity"
            value={release.releaseQuantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status
          <input type="text" value={release.status} disabled />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-save">Submit</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/admin/resource-management")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceReleaseForm;
