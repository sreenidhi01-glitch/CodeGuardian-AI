import { useState } from "react";
import api from "../services/api";

function GitHubReview() {
  const [repo, setRepo] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const analyzePR = async () => {

  if (!repo || !prNumber) {
    alert("Please enter repository and PR number.");
    return;
  }

  setLoading(true);

  try {

    const response = await api.post("/github/review", {
      repo,
      pr_number: Number(prNumber),
    });


    console.log("API RESPONSE:", response.data);


    if (response.data.status === "error") {
      alert(response.data.message);
      setResult(null);
      return;
    }


    setResult(response.data);


  } catch (err) {

    console.error(err);
    alert("Failed to analyze Pull Request.");

  } finally {

    setLoading(false);

  }

};
  const downloadReport = async () => {
    if (!repo || !prNumber) {
      alert("Please enter repository and PR number.");
      return;
    }

    try {
      const response = await api.post(
        "/github/report",
        {
          repo,
          pr_number: Number(prNumber),
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/pdf",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "GitHub_PR_Report.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download report.");
    }
  };

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        🚀 GitHub Pull Request Review
      </h2>

      <input
        type="text"
        placeholder="Repository (owner/repo)"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="w-full p-4 rounded-lg bg-slate-800 text-white mb-5"
      />

      <input
        type="number"
        placeholder="Pull Request Number"
        value={prNumber}
        onChange={(e) => setPrNumber(e.target.value)}
        className="w-full p-4 rounded-lg bg-slate-800 text-white mb-5"
      />

      <div className="flex gap-4 mb-8">

        <button
          onClick={analyzePR}
          className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg font-bold"
        >
          {loading ? "Analyzing..." : "Analyze Pull Request"}
        </button>

        {result && (
          <button
            onClick={downloadReport}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold"
          >
            📄 Download PR Report
          </button>
        )}

      </div>

      {result && (
        <div className="mt-10 space-y-8">

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Pull Request Overview
            </h3>

            <p><strong>Repository:</strong> {result.repository}</p>
            <p><strong>Pull Request:</strong> #{result.pull_request}</p>
            <p><strong>Files Scanned:</strong> {result.files_scanned}</p>

            <div className="mt-6">

              <p className="text-lg font-semibold">
                Security Score
              </p>

              <div className="w-full bg-slate-700 rounded-full h-6 mt-2">
                <div
                  className="bg-green-500 h-6 rounded-full text-center text-black font-bold"
                  style={{
                    width: `${result.security_score}%`
                  }}
                >
                  {result.security_score}
                </div>
              </div>

              <p className="mt-3">
                <strong>Risk Level:</strong> {result.risk_level}
              </p>

            </div>

          </div>

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              🤖 AI Code Review
            </h3>

            <p className="text-xl mb-4">
  {result.review?.status || "Review completed"}
</p>

<p className="text-slate-300">
  {result.review?.summary || "No AI summary available"}
</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              ✅ Strengths
            </h3>

            {result.review?.strengths?.map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}

          </div>

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-red-400 mb-4">
              ⚠️ Concerns
            </h3>

            {!result.review?.concerns||result.review.concerns.length === 0 ? (
              <p>No concerns detected.</p>
            ) : (
              result.review.concerns.map((item: string, index: number) => (
                <p key={index}>• {item}</p>
              ))
            )}

          </div>

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-cyan-400 mb-6">
              Security Findings
            </h3>

            {result.findings.length === 0 ? (
              <p className="text-green-400">
                🎉 No security findings detected.
              </p>
            ) : (
              result.findings.map((finding: any, index: number) => (
                <div
                  key={index}
                  className="border border-slate-700 rounded-lg p-5 mb-5"
                >

                  <h4 className="text-xl font-bold text-red-400">
                    {finding.type}
                  </h4>

                  <p><strong>Severity:</strong> {finding.severity}</p>
                  <p><strong>File:</strong> {finding.file}</p>
                  <p><strong>Line:</strong> {finding.line}</p>

                  <pre className="bg-black rounded-lg p-4 mt-4 overflow-x-auto text-green-300">
                    {finding.code}
                  </pre>

                  <div className="mt-5 space-y-3">

                    <p><strong>Why:</strong> {finding.why}</p>

                    <p><strong>Fix:</strong> {finding.fix}</p>

                    <pre className="bg-slate-900 p-4 rounded">
                      {finding.example}
                    </pre>

                    <p>
                      <strong>Best Practice:</strong>{" "}
                      {finding.best_practice}
                    </p>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default GitHubReview;