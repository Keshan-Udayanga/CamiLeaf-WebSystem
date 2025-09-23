import AdminProductTable from "./ProductTable";
import EditProductForm from "./EditProductForm";
import { Routes, Route } from "react-router-dom";
import ProductForm from "./AddProductForm" ;


function productManagement() {
  return (
    <Routes>          
      <Route path="/" element={<AdminProductTable />} />
      <Route path="/edit/:id" element={<EditProductForm />} />
      <Route path="/addProduct" element={<ProductForm />}/>
   </Routes>
  );
}
export default productManagement;
