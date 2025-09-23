import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/EditForm.css"
import api from "../../axiosConfig";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    price: "",
    stock: "",
    discount: "",
    category: "",
    productImg: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(id);
        const response = await api.get(`/api/v1/product/get/` + id);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update?")) return;

    try {
      await api.put(`/api/v1/product/update/${id}`, form);
      alert("Product updated successfully!");
      navigate("/admin/product-management");
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
        <option value="CTC">CTC</option>
        <option value="Orthodox">Orthodox</option>
      </select>
    </label>
    <div className="form-actions">
      <button type="submit" className="btn-save">Update</button>
      <button type="button" className="btn-cancel" onClick={() => navigate("/admin/products")}>
        Cancel
      </button>
    </div>
  </form>
</div>

  );
};

export default EditProductForm;
