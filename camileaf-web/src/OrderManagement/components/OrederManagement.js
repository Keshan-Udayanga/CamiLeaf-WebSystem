import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderManagementTable from "./OrderManagementTable";
import OrderEditForm from "./OrderEditForm";

function App() {
  return (
    <>
      
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<OrderManagementTable />} />
          <Route path="/edit/:id" element={<OrderEditForm />} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;