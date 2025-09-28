import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddResourcesForm.css";
import api from "../../axiosConfig";

const AddResourceForm = () => {
  const navigate = useNavigate();
  const [resource, setResource] = useState({
    resourceType: "",
    quantity: "",
    unitOfMeasure: "",
  });

  const [errors, setErrors] = useState({
    quantity: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      if (value === "" || parseInt(value) <= 0) {
        setErrors({ ...errors, quantity: "Quantity must be greater than 0" });
      } else {
        setErrors({ ...errors, quantity: "" });
      }
    }

    setResource({ ...resource, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.quantity) return;

    setConfirmMessage(
      `Are you sure you want to add ${resource.quantity} ${resource.unitOfMeasure} of ${resource.resourceType}?`
    );
    setShowConfirm(true);
  };

  const confirmAdd = async () => {
    try {
      await api.post("/api/v1/resource/add", {
        resourceType: resource.resourceType,
        quantity: resource.quantity,
        unit: resource.unitOfMeasure,
      });

      setShowConfirm(false);
      navigate("/admin/resource-management");
    } catch (error) {
      console.error("Error adding resource:", error);
      setConfirmMessage("Failed to add resource. Please try again.");
    }
  };

  const cancelAdd = () => {
    setShowConfirm(false);
    setConfirmMessage("");
  };

  return (
    <div className="add-form-container">
      <h3>Add New Resource</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Resource Type
          <select
            name="resourceType"
            value={resource.resourceType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              --Select resource type--
            </option>
            <option value="Glass Bottles">Glass Bottles</option>
            <option value="Plastic Bottles">Plastic Bottles</option>
            <option value="Labels">Labels</option>
            <option value="Stickers / Seals">Stickers / Seals</option>
            <option value="Cartons / Cardboard Boxes">
              Cartons / Cardboard Boxes
            </option>
            <option value="Polythene / Foil Pouches">Polythene / Foil Pouches</option>
            <option value="Bottle Caps / Lids">Bottle Caps / Lids</option>
            <option value="Shrink Wrap Film">Shrink Wrap Film</option>
            <option value="Tea Bags (empty filter bags)">Tea Bags</option>
            <option value="Measuring Spoons / Scoops">Measuring Spoons / Scoops</option>
          </select>
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={resource.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1"
            className={errors.quantity ? "error-input" : ""}
          />
          {errors.quantity && <span className="error-text">{errors.quantity}</span>}
        </label>

        <label>
          Unit of Measure
          <select
            name="unitOfMeasure"
            value={resource.unitOfMeasure}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              --Select Unit--
            </option>
            <option value="Boxes">Boxes</option>
            <option value="Pieces">Pieces</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={!!errors.quantity}>
            Save
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
              {confirmMessage.includes("Failed") ? (
                <button className="confirm-btn btn-ok" onClick={cancelAdd}>
                  OK
                </button>
              ) : (
                <>
                  <button className="confirm-btn btn-yes" onClick={confirmAdd}>
                    OK
                  </button>
                  <button className="confirm-btn btn-no" onClick={cancelAdd}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResourceForm;
