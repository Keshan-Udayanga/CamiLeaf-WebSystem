import { Routes, Route } from "react-router-dom";
import ResourceTablePage from "./DisplayResources";
import ResourceReleaseForm from "./ResourceReleaseForm";
import AddResources from "./AddResources"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ResourceTablePage />} />
      <Route path="/release/:id" element={<ResourceReleaseForm />} />
      <Route path="/add" element={<AddResources />} />
    </Routes>
  );
}

export default App;
