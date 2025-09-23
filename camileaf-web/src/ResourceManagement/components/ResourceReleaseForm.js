import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ReleaseForm.css";

const ResourceReleaseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state;

  const [release, setRelease] = useState({
    resourceId: resource?.id || "",
    resourceType: resource?.resourceType || "",
    releaseDate: "",
    releaseQuantity: "",
    currentQuantity: resource?.quantity || "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setRelease({ ...release, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Release record:", release);

    // Example: simulate reducing stock at the end of the day
    alert(
      `Release request created for ${release.releaseQuantity} ${resource.unitOfMeasure} of ${resource.resourceType}.`
    );

    // Redirect to Resource Table page after submit
    navigate("/admin/resource-management");
  };

  return (
    <div className="release-form-container">
      <h3>Release Resource</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Resource ID
          <input type="text" name="resourceId" value={release.resourceId} disabled />
        </label>

        <label>
          Resource Type
          <input type="text" name="resourceType" value={release.resourceType} disabled />
        </label>

        <label>
          Current Quantity
          <input
            type="number"
            name="releaseDate"
            value={release.currentQuantity}
            onChange={handleChange}
            required
         disabled />
        </label>

        <label>
          Quantity to Release
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
