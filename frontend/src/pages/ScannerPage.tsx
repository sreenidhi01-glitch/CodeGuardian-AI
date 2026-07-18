import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUpload, FaGithub, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import CodeUpload from "../components/CodeUpload";
import GitHubReview from "../components/GitHubReview";

export default function ScannerPage() {
  const [mode, setMode] = useState<"upload" | "github">("upload");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white pt-28">

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-6xl font-extrabold">
            🛡️ CodeGuardian AI
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            AI-Powered Secure Code Review Assistant
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="max-w-4xl mx-auto flex justify-center gap-6 mb-10">

          <button
            onClick={() => setMode("upload")}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition ${
              mode === "upload"
                ? "bg-cyan-500 text-black shadow-lg"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            <FaUpload />
            Upload Source Code
          </button>

          <button
            onClick={() => setMode("github")}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition ${
              mode === "github"
                ? "bg-cyan-500 text-black shadow-lg"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            <FaGithub />
            GitHub Pull Request
          </button>

        </div>

        {/* Scanner Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 pb-20"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

            {mode === "upload" ? (
              <CodeUpload />
            ) : (
              <GitHubReview />
            )}

          </div>
        </motion.div>

      </div>
    </>
  );
}