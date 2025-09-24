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
  });

  const [errors, setErrors] = useState({
    price: "",
    stock: "",
    discount: "",
    category: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/v1/product/get/` + id);
        
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage({ type: "error", text: "Failed to load product details." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (showConfirm || message) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showConfirm, message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "stock") {
      newErrors.stock = value === "" || parseInt(value) < 1 ? "Stock must be at least 1" : "";
    }

    if (name === "price") {
      newErrors.price = value === "" || parseFloat(value) <= 0 ? "Price must be greater than 0" : "";
    }

    if (name === "discount") {
      const discountValue = parseFloat(value);
      newErrors.discount =
        value && (discountValue < 0 || discountValue > 100)
          ? "Discount must be between 0 and 100"
          : "";
    }

    if (name === "category") {
      newErrors.category = !value ? "Please select a category" : "";
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.productName.trim()) return "Product name is required";
    if (!form.price || parseFloat(form.price) <= 0) return "Price must be greater than 0";
    if (!form.stock || parseInt(form.stock) < 1) return "Stock must be at least 1";
    if (form.discount) {
      const discountValue = parseFloat(form.discount);
      if (discountValue < 0 || discountValue > 100) return "Discount must be between 0 and 100";
    }
    if (!form.category) return "Please select a category";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    if (Object.values(errors).some((err) => err !== "")) {
      setMessage({ type: "error", text: "Please fix the errors before submitting" });
      return;
    }

    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    try {
      setIsLoading(true);
      await api.put(`/api/v1/product/update/${id}`, {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        discount: form.discount ? parseFloat(form.discount) : 0,
      });

      setShowConfirm(false);
      setMessage({ type: "success", text: "Product updated successfully!" });
    } catch (error) {
      console.error("Error updating product:", error);
      setShowConfirm(false);
      setMessage({ type: "error", text: "Failed to update product. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelUpdate = () => setShowConfirm(false);

  const closeMessage = () => {
    setMessage(null);
    if (message?.type === "success") navigate("/admin/product-management/");
  };

  if (isLoading && !form.productName) {
    return (
      <div className="edit-product-form-container" style={{ textAlign: "center", padding: "50px" }}>
        <div>Loading product details...</div>
      </div>
    );
  }

  return (
    <>
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
              placeholder="Enter discount (0-100)"
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
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/admin/product-management/")}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirm Update Modal */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h4>Confirm Update</h4>
            <p>Are you sure you want to update this product? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button onClick={confirmUpdate} className="confirm-btn btn-yes" disabled={isLoading}>
                {isLoading ? "Updating..." : "Yes, Update"}
              </button>
              <button onClick={cancelUpdate} className="confirm-btn btn-no" disabled={isLoading}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Message Modal */}
      {message && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h4>{message.type === "success" ? "Success!" : "Error"}</h4>
            <p className={message.type === "success" ? "success-message" : "error-message"}>
              {message.text}
            </p>
            <div className="confirm-actions">
              <button onClick={closeMessage} className="confirm-btn btn-ok">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductForm;
