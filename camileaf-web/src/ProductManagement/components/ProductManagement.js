import AdminProductTable from "./ProductTable";
import EditProductForm from "./EditProductForm";
import { Routes, Route } from "react-router-dom";


function productManagement() {
  return (
    <Routes>
          
          <Route path="/" element={<AdminProductTable />} />
          <Route path="/edit/*" element={<EditProductForm />} />
        </Routes>
  );
}
export default productManagement;
