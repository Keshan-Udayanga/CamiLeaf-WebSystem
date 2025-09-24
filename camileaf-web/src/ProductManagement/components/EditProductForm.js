import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/EditForm.css";
import axios from "axios";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    price: "",
    stock: "",
    discount: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    price: "",
    stock: "",
    discount: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/product/get/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Stock >= 1
    if (name === "stock") {
      if (value === "" || parseInt(value) < 1) {
        newErrors.stock = "Stock must be at least 1";
      } else {
        newErrors.stock = "";
      }
    }

    // Price > 0
    if (name === "price") {
      if (value === "" || parseFloat(value) <= 0) {
        newErrors.price = "Price must be greater than 0";
      } else {
        newErrors.price = "";
      }
    }

    // Discount: max 1 decimal place, 0-100
    if (name === "discount") {
      if (value === "") {
        newErrors.discount = "";
      } else {
        const parts = value.split(".");
        const num = parseFloat(value);
        if (num < 0 || num > 100) {
          newErrors.discount = "Discount must be between 0 and 100";
        } else if (parts[1] && parts[1].length > 1) {
          newErrors.discount = "Only 1 decimal place allowed";
        } else {
          newErrors.discount = "";
        }
      }
    }

    // Category required
    if (name === "category") {
      if (!value) {
        newErrors.category = "Please select a category";
      } else {
        newErrors.category = "";
      }
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if validation errors exist
    if (errors.price || errors.stock || errors.discount || errors.category) {
      alert("Please fix errors before submitting.");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/api/v1/product/update/${id}`, form);
      alert("Product updated successfully!");
      navigate("/admin/product-management/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="edit-product-form-container">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Product ID
          <input type="text" value={id} disabled />
        </label>

        <label>
          Product Name
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </label>

        <label>
          Price (LKR)
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className={errors.price ? "error-input" : ""}
            min="0.01"
            step="0.01"
            placeholder="Enter price"
            required
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </label>

        <label>
          Stock Count
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className={errors.stock ? "error-input" : ""}
            min="1"
            step="1"
            placeholder="Enter stock quantity"
            required
          />
          {errors.stock && <span className="error-text">{errors.stock}</span>}
        </label>

        <label>
          Discount (%)
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className={errors.discount ? "error-input" : ""}
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter discount (max 1 decimal)"
          />
          {errors.discount && <span className="error-text">{errors.discount}</span>}
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={errors.category ? "error-input" : ""}
            required
          >
            <option value="" disabled>
              --Select Product Category--
            </option>
            <option value="CTC">CTC</option>
            <option value="Orthodox">Orthodox</option>
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-save">Update</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/admin/product-management/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
