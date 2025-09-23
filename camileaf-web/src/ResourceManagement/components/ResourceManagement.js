import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResourceTablePage from "./DisplayResources";

function App() {
  return (
    <>
      
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ResourceTablePage />} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;
