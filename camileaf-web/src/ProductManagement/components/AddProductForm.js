import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/ProductForm.css";

const ProductForm = ({ onClose, onAdd }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    price: "",
    stock: "",
    discount: "",
    category: "",
    productImg: null,
    imagePreview: "",
  });

  const [errors, setErrors] = useState({
    price: "",
    stock: "",
    discount: "",
    category: "",
  });

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        productImg: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check validation errors
    if (errors.price || errors.stock || errors.category) {
      alert("Please fix errors before submitting.");
      return;
    }

    if (!form.productName || !form.price || !form.stock || !form.category || !form.productImg) {
      alert("Please fill all required fields.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const product = {
        productImg: reader.result,
        productName: form.productName,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        discount: parseFloat(form.discount),
        category: form.category,
      };

      try {
        const response = await axios.post(
          "http://localhost:8081/api/v1/product/add",
          product
        );

        if (response.status === 200) {
          if (typeof onAdd === "function") onAdd(product);

          setForm({
            productName: "",
            price: "",
            stock: "",
            discount: "",
            category: "",
            productImg: null,
            imagePreview: "",
          });

          navigate("/admin/product-management/");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    };

    reader.readAsDataURL(form.productImg);
  };

  return (
    <div className="product-form-container">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
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
          {errors.discount && (
            <span className="error-text">{errors.discount}</span>
          )}
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
          {errors.category && (
            <span className="error-text">{errors.category}</span>
          )}
        </label>

        <label>
          Product Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            placeholder="Choose product image"
            required
          />
        </label>

        {form.imagePreview && (
          <div className="image-preview">
            <img src={form.imagePreview} alt="Preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/admin/product-management/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
