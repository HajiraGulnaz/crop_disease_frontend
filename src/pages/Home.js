import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        //marginTop: "80px", // ✅ comma added here
        height: "100vh",
        width:"100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        overflow:"hidden",
      }}
    >

      <h1>🌾 Crop Disease Detection</h1>

      <div style={{ marginTop: "40px" }}>
        <button onClick={() => navigate("/detect")} className="btn">
          🎥 Detect Disease
        </button>

        <button onClick={() => navigate("/disease-info")} className="btn">
          🤖 Disease Information
        </button>

        <button onClick={() => navigate("/schemes")} className="btn">
          🏛 Government Schemes
        </button>
      </div>
    </div>
  );
}

export default Home;
