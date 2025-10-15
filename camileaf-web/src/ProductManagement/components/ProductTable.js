import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import "../Styles/ProductTable.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("");

  const [showConfirm, setShowConfirm] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 

  const navigate = useNavigate();
  const rowsPerPage = 10;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/v1/product/getAll");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async () => {
    try {
      await api.delete(`/api/v1/product/delete/${deleteId}`);
      setShowConfirm(false);
      setDeleteId(null);
      fetchProducts(); // refresh table
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  // Search filter
  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "priceLow") return a.price - b.price;
    if (sortType === "priceHigh") return b.price - a.price;
    if (sortType === "date") return new Date(b.addedDate) - new Date(a.addedDate);
    if (sortType === "stock") return b.stock - a.stock;
    return 0;
  });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedProducts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedProducts.length / rowsPerPage);

  return (
    <div className="admin-products-container">
      <h2>Manage Products</h2>

      {/* Top Actions */}
      <div className="top-actions">
        <button className="btn-add" onClick={() => navigate("/admin/product-management/addProduct")}>
          <FaPlus /> Add Product
        </button>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sort-box">
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceLow">Price (Low → High)</option>
            <option value="priceHigh">Price (High → Low)</option>
            <option value="date">Date (Newest)</option>
            <option value="stock">Stock (High → Low)</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product-ID</th>
              <th>Image</th>
              <th>Product</th>
              <th>Price (LKR)</th>
              <th>Stock</th>
              <th>Date</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((p, index) => (
              <tr key={p.id || p._id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>
                  <img src={p.productImg} alt={p.productName} className="product-img" />
                </td>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{new Date(p.addedDate).toLocaleDateString()}</td>
                <td>{p.discount}%</td>
                <td>{p.category}</td>
                <td style={{ width: "15%" }}>
                  <button
                    className="butn-edit"
                    onClick={() => navigate(`/admin/product-management/edit/${p.id || p._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="butn-delete"
                    onClick={() => {
                      setDeleteId(p.id || p._id);
                      setShowConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this product?</p>
            <div className="confirm-actions">
              <button className="btn-confirm" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductTable;
