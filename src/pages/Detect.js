import { useState } from "react";
import axios from "axios";

function Detect() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUpload = async () => {
    if (!video) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", video);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/detect/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const copyDisease = () => {
    if (!result?.detected_diseases?.length) return;

    const text = result.detected_diseases.join(", ");
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1656407410275-e63e689bcd90?w=1000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "darken",
        padding: "20px",
      }}
    >
      {/* ✅ Everything goes INSIDE this card */}
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "25px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h2>🎥 Disease Detection</h2>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <br /><br />

        <button className="btn" onClick={handleUpload}>
          Upload & Detect
        </button>

        {loading && <p>Processing video... ⏳</p>}

        {result && (
          <div className="card">
            <h3>Detected Diseases</h3>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#1b5e20" }}>
                {result.detected_diseases.join(", ")}
              </p>

              <button
                onClick={copyDisease}
                style={{
                  padding: "6px 10px",
                  fontSize: "12px",
                  cursor: "pointer",
                  borderRadius: "6px",
                  border: "none",
                  background: "#2e7d32",
                  color: "white",
                }}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <h4>Detected Video</h4>
            <div style={{ maxWidth: "500px", margin: "auto" }}>
              <video key={result.output_video} controls width="100%">
                <source
                  src={`http://127.0.0.1:8000/outputs/${result.output_video}`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detect;