import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderManagementTable from "./OrderManagementTable";

function App() {
  return (
    <>
      
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<OrderManagementTable />} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;