import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ReleaseForm.css";
import api from "../../axiosConfig";

const ResourceReleaseForm = ({ onUpdate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state;

  const [release, setRelease] = useState({
    resourceId: resource?.id || "",
    resourceType: resource?.resourceType || "",
    currentQuantity: resource?.quantity || 0,
    releaseQuantity: "",
    status: resource?.quantity === 0 ? "Out of Stock" : "Pending",
  });

  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); // modal visibility
  const [confirmMessage, setConfirmMessage] = useState(""); // modal message

  const handleChange = (e) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    if (value === "" || numValue <= 0) {
      setError("Quantity must be greater than 0");
    } else if (numValue > release.currentQuantity) {
      setError("Release quantity cannot exceed current stock");
    } else {
      setError("");
    }

    setRelease({ ...release, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;

    if (release.currentQuantity === 0) {
      setConfirmMessage("Cannot release. Resource is out of stock!");
      setShowConfirm(true);
      return;
    }

    setConfirmMessage(
      `Are you sure you want to release ${release.releaseQuantity} ${resource.unit} of ${resource.resourceType}?`
    );
    setShowConfirm(true);
  };

  const confirmRelease = async () => {
    try {
      const qtyToRelease = parseInt(release.releaseQuantity, 10);
      const response = await api.put(
        `/api/v1/resource/release/${release.resourceId}`,
        { releaseQuantity: qtyToRelease }
      );

      const updatedQuantity = response.data.quantity;
      setRelease({
        ...release,
        currentQuantity: updatedQuantity,
        releaseQuantity: "",
        status: updatedQuantity === 0 ? "Out of Stock" : "Pending",
      });

      if (onUpdate) onUpdate(response.data);
      setShowConfirm(false);
      navigate("/admin/resource-management");
    } catch (err) {
      console.error("Error releasing resource:", err);
      setConfirmMessage("Failed to release resource. Please try again.");
    }
  };

  const cancelRelease = () => {
    setShowConfirm(false);
    setConfirmMessage("");
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
          <input
            type="text"
            value={
              release.currentQuantity === 0 ? "Out of Stock" : release.currentQuantity
            }
            disabled
          />
        </label>

        <label>
          Quantity to Release ({resource.unit})
          <input
            type="number"
            name="releaseQuantity"
            value={release.releaseQuantity}
            onChange={handleChange}
            className={error ? "error-input" : ""}
            required
            disabled={release.currentQuantity === 0}
          />
          {error && <span className="error-text">{error}</span>}
        </label>

        <label>
          Status
          <input type="text" value={release.status} disabled />
        </label>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-save"
            disabled={!!error || release.currentQuantity === 0}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/admin/resource-management")}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Modern Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>{confirmMessage}</p>
            <div className="confirm-actions">
              {release.currentQuantity !== 0 && !error ? (
                <>
                  <button className="confirm-btn btn-yes" onClick={confirmRelease}>
                    OK
                  </button>
                  <button className="confirm-btn btn-no" onClick={cancelRelease}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="confirm-btn btn-ok" onClick={cancelRelease}>
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceReleaseForm;
