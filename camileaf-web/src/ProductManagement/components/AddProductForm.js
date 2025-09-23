import React, { useState } from "react";
import axios from "axios";
import "../Styles/ProductForm.css";

const ProductForm = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    productName: "",
    price: "",
    stock: "",
    discount: "",
    category: "CTC", // default
    productImg: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    if (!form.productName || !form.price || !form.stock || !form.productImg) {
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
        discount: parseFloat(form.discount || 0),
        category: form.category,
      };

      try {
        const response = await axios.post(
          "http://localhost:8081/api/v1/product/add",
          product
        );

        if (response.status === 200) {
          const savedProduct = { ...product, _id: response.data }; // Backend returns ID

          // ✅ only call if onAdd is provided
          if (typeof onAdd === "function") {
            onAdd(savedProduct);
          }

          alert("Product added successfully!");
          setForm({
            productName: "",
            price: "",
            stock: "",
            discount: "",
            category: "",
            productImg: null,
            imagePreview: "",
          });

          if (typeof onClose === "function") {
            onClose();
          }
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
            required
          />
        </label>

        <label>
          Stock Count
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Discount (%)
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="0"
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="CTC">CTC</option>
            <option value="Orthodox">Orthodox</option>
          </select>
        </label>

        <label>
          Product Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
            onClick={() => typeof onClose === "function" && onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
