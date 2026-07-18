import { useState } from "react";
import { FaCloudUploadAlt, FaFileCode } from "react-icons/fa";
import api from "../services/api";

import Dashboard from "./Dashboard";
import PRReview from "./PRReview";
import PRHeader from "./PRHeader";
import LoadingScreen from "./LoadingScreen";

function CodeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setLoading(true);
    setMessage("Analyzing code...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      setMessage("✅ Analysis Completed Successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/report", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/pdf",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "CodeGuardian_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download report.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-10">

  {/* Upload Area */}

  <input
    id="file-upload"
    type="file"
    hidden
    onChange={(e) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    }}
  />

  <label
    htmlFor="file-upload"
    className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-cyan-500 rounded-xl cursor-pointer hover:bg-slate-800 transition duration-300"
  >
    <FaCloudUploadAlt className="text-6xl text-cyan-400 mb-4" />

    <h2 className="text-2xl font-bold text-white">
      Click to Select Code File
    </h2>

    <p className="text-slate-400 mt-2">
      Python • Java • JavaScript • C++ • ZIP
    </p>

  </label>

  {/* Selected File */}

  {file && (
    <div className="flex items-center justify-center gap-3 mt-6 text-green-400 text-lg font-semibold">
      <FaFileCode />
      {file.name}
    </div>
  )}

  {/* Buttons */}

  <div className="flex justify-center gap-4 mt-8 flex-wrap">

    <button
      onClick={uploadFile}
      className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg text-lg font-bold transition duration-300 shadow-lg"
    >
      🔍 Analyze Code
    </button>

    {result && (
      <button
        onClick={downloadReport}
        className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-bold transition duration-300 shadow-lg"
      >
        📄 Download Report
      </button>
    )}

  </div>

  {/* Status */}

  {message && (
    <p className="text-center mt-6 text-green-400 font-semibold">
      {message}
    </p>
  )}

  {/* Dashboard */}

  {result && (
    <>
      <PRHeader review={result.review} />

      <PRReview review={result.review} />

      <Dashboard result={result} />

      {/* Security Score */}

      <div className="bg-slate-800 rounded-xl p-6 mt-8 mb-8 shadow-lg">

        <h2 className="text-2xl font-bold text-cyan-400">
          Security Score
        </h2>

        <p className="text-5xl font-bold mt-4">
          {result.security_score}/100
        </p>

        <p className="text-red-400 text-xl font-semibold mt-2">
          {result.risk_level}
        </p>

        <p className="mt-2">
          Total Findings: {result.total_findings}
        </p>

      </div>

      {/* Findings */}

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        🔒 Security Findings
      </h2>
            {result.findings.map((finding: any, index: number) => (

        <div
          key={index}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 shadow-lg"
        >

          <h3 className="text-2xl font-bold text-red-400">
            {finding.type}
          </h3>


          <div className="mt-4 space-y-2">

            <p>
              <strong>Severity:</strong> {finding.severity}
            </p>

            <p>
              <strong>Line:</strong> {finding.line}
            </p>

          </div>


          {/* Vulnerable Code */}

          <pre className="bg-slate-950 rounded-lg p-4 mt-5 overflow-x-auto text-sm text-green-300">
            {finding.code}
          </pre>


          {/* AI Security Advisor */}

          <div className="mt-6 space-y-5">


            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-yellow-500">

              <h4 className="font-bold text-yellow-400 text-lg">
                📖 Why is this dangerous?
              </h4>

              <p className="text-slate-300 mt-2">
                {finding.why}
              </p>

            </div>



            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-blue-500">

              <h4 className="font-bold text-blue-400 text-lg">
                🛠 Recommended Fix
              </h4>

              <p className="text-slate-300 mt-2">
                {finding.fix}
              </p>

            </div>



            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-green-500">

              <h4 className="font-bold text-green-400 text-lg">
                💻 Secure Example
              </h4>


              <pre className="mt-3 bg-black p-3 rounded text-green-300 overflow-x-auto">
                {finding.secure_code || finding.example || "No secure example available"}
              </pre>

            </div>



            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-cyan-500">

              <h4 className="font-bold text-cyan-400 text-lg">
                ✅ Best Practice
              </h4>

              <p className="text-slate-300 mt-2">
                {finding.best_practice}
              </p>

            </div>



            {finding.fix_explanation && (

              <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-purple-500">

                <h4 className="font-bold text-purple-400 text-lg">
                  🤖 AI Explanation
                </h4>

                <p className="text-slate-300 mt-2">
                  {finding.fix_explanation}
                </p>

              </div>

            )}


          </div>


        </div>

      ))}

    </>

  )}

</div>
  );
}

export default CodeUpload;