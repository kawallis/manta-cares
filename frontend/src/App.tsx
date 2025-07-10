import { Routes, Route } from "react-router-dom";
import SymptomList from "./pages/SymptomsList";
import SymptomDetail from "./pages/SymptomDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SymptomList />} />
      <Route path="/symptoms/:id" element={<SymptomDetail />} />
    </Routes>
  );
}

export default App;
