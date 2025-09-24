import { Routes, Route } from "react-router-dom";
import Record from "./Record"
import IntakesDetails from "./RecordDetails"
import EditLeafIntake from "./EditLeafIntake";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Record />} />
      <Route path="/intakes-details" element={<IntakesDetails />} />
      <Route path="/edit/:id" element={<EditLeafIntake />} />
    </Routes>
  );
}

export default App;
