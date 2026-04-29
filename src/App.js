import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import DiseaseInfo from "./pages/DiseaseInfo";
import Schemes from "./pages/Schemes";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/disease-info" element={<DiseaseInfo />} />
        <Route path="/schemes" element={<Schemes />} />
      </Routes>
    </Router>
  );
}

export default App;
