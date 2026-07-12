import { useState } from "react";
import api from "../services/api";

function CodeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      setMessage("Analysis Completed Successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload & Analyze
      </button>

      <p>{message}</p>
      {result && (
  <div style={{ marginTop: "30px", textAlign: "left" }}>
    <h2>Scan Results</h2>

    <p>
      <strong>Security Score:</strong> {result.security_score}
    </p>

    <p>
      <strong>Risk Level:</strong> {result.risk_level}
    </p>

    <p>
      <strong>Total Findings:</strong> {result.total_findings}
    </p>

    <hr />

    {result.findings.map((finding: any, index: number) => (
      <div
        key={index}
        style={{
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        <h3>{finding.type}</h3>

        <p>
          <strong>Severity:</strong> {finding.severity}
        </p>

        <p>
          <strong>Line:</strong> {finding.line}
        </p>

        <pre>{finding.code}</pre>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default CodeUpload;