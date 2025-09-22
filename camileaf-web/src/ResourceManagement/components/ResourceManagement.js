import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../UserManagement/components/Sidebar";
import ResourceTablePage from "./DisplayResources";

function App() {
  return (
    <Router>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}> {/* space for sidebar */}
        <Routes>
          <Route path="/admin/resource-management" element={<ResourceTablePage />} />
          {/* You can add other routes here */}
        </Routes>
        <h1>Hesjajjij</h1>
      </div>
    </Router>
  );
}

export default App;
