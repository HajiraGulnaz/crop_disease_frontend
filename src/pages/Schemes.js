import { useState } from "react";
import axios from "axios";
import DiseaseAutoComplete from "../components/DiseaseAutoComplete";
import StateDropdown from "../components/StateDropdown";

function Schemes() {
  const [disease, setDisease] = useState("");
  const [state, setState] = useState("");
  const [schemes, setSchemes] = useState([]);

  const searchSchemes = async () => {
    if (!disease) return alert("Select disease");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/schemes/`, {
        disease,
        state,
      });

      setSchemes(res.data.schemes || []);
    } catch (err) {
      alert("Error fetching schemes");
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage:
        "url('https://plus.unsplash.com/premium_photo-1661879923091-a228184f8bfb?q=80&w=955&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // ✅ direct image
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgba(0,0,0,0.4)",
      backgroundBlendMode: "darken",
      padding: "20px",
    }}
  >
    <div className="container">
      <h2>🏛 Government Schemes</h2>

      <DiseaseAutoComplete
        value={disease}
        onSelect={(value) => setDisease(value)}
      />

      <br />

      <StateDropdown onSelect={(value) => setState(value)} />

      <br />

      <button onClick={searchSchemes} className="btn">
        Search
      </button>

      {schemes.map((s, i) => (
        <div key={i} className="card">
          <h3>{s.scheme_name}</h3>
          <p>{s.description}</p>
          <a href={s.link} target="_blank" rel="noreferrer">
            View Scheme
          </a>
        </div>
      ))}
    </div>
  </div>
);
}

export default Schemes;