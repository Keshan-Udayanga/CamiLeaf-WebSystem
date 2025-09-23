import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddResourcesForm.css";

const AddResourceForm = () => {
  const navigate = useNavigate();
  const [resource, setResource] = useState({
    resourceType: "",
    quantity: "",
    unitOfMeasure: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/v1/resource/add", {
        resourceType: resource.resourceType,
        quantity: resource.quantity,
        unit: resource.unitOfMeasure,
      });
      alert(`Resource ${resource.resourceType} added successfully!`);
      navigate("/admin/resource-management");
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Failed to add resource. Please try again.");
    }
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
            <option value="">Select Material</option>
            <option value="Glass Bottles">Glass Bottles</option>
            <option value="Plastic Bottles">Plastic Bottles</option>
            <option value="Labels">Labels</option>
            <option value="Stickers / Seals">Stickers / Seals</option>
            <option value="Cartons / Cardboard Boxes">Cartons / Cardboard Boxes</option>
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
            required
            placeholder="Enter quantity"
          />
        </label>

        <label>
          Unit of Measure
          <select
            name="unitOfMeasure"
            value={resource.unitOfMeasure}
            onChange={handleChange}
            required
          >
            <option value="">--Select Unit--</option>
            <option value="Boxes">Boxes</option>
            <option value="Pieces">Pieces</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
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

export default AddResourceForm;
