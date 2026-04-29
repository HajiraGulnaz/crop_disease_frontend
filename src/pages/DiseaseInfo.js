import { useState } from "react";
import axios from "axios";
import DiseaseAutoComplete from "../components/DiseaseAutoComplete";

function DiseaseInfo() {
  const [disease, setDisease] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!disease) return;

    // 👉 Always split by comma (frontend safety)
    const diseaseList = disease
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      const responses = await Promise.all(
        diseaseList.map((d) =>
          axios.post(`${process.env.REACT_APP_API_URL}/disease-info/`, { disease: d })
        )
      );

      setResults(responses.map((res) => res.data));
    } catch (err) {
      alert("Error fetching disease info");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage: "url('https://media.istockphoto.com/id/1306713348/photo/drone-in-soybean-crop.webp?a=1&b=1&s=612x612&w=0&k=20&c=rP2Gkf8sFySYj2ZXmJnPgk6dOoGMh4RcWb8O7Dzg6TQ=')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgba(0,0,0,0.4)",
      backgroundBlendMode: "darken",
    }}
  >
    <div className="container">
      <h2>🌿 Plant Disease Information</h2>

      <DiseaseAutoComplete onSelect={setDisease} />

      <button className="btn" onClick={handleSearch}>
        Get Info
      </button>

      {loading && <p>Loading... ⏳</p>}

      {results.map((res, index) => (
        <div key={index} className="card">
          <h3>{res.disease}</h3>

          <h4>Symptoms</h4>
          <ul>
            {res.symptoms?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h4>Organic Treatment</h4>
          <ul>
            {res.treatment?.organic?.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h4>Chemical Treatment</h4>
          <ul>
            {res.treatment?.chemical?.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h4>Prevention</h4>
          <ul>
            {res.prevention?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div> 
);
}

export default DiseaseInfo;
