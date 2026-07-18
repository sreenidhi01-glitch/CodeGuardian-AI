import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-slate-950 text-white flex items-center overflow-hidden pt-28">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm">
            AI Powered Security Scanner
          </span>

          <h1 className="text-6xl font-extrabold mt-6 leading-tight">
            CodeGuardian
            <span className="text-cyan-400"> AI</span>
          </h1>

          <p className="mt-8 text-slate-300 text-xl leading-9">
            Detect vulnerabilities, review GitHub Pull Requests,
            discover secrets, perform static analysis,
            and generate professional security reports using AI.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              to="/scan"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition"
            >
              Start Security Scan
              <FaArrowRight />
            </Link>

            <a
              href="#features"
              className="border border-cyan-500 px-8 py-4 rounded-xl hover:bg-cyan-500 hover:text-black transition"
            >
              Explore Features
            </a>

          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-14">

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">100+</h2>
              <p className="text-slate-400">Security Rules</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">AI</h2>
              <p className="text-slate-400">Code Review</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">PDF</h2>
              <p className="text-slate-400">Professional Reports</p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Security Scan Preview
              </h2>

              <FaArrowRight className="text-cyan-400" />
            </div>

            <div className="space-y-4">

              <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
                <span>Hardcoded Secret</span>
                <span className="text-red-500">Critical</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
                <span>SQL Injection</span>
                <span className="text-orange-400">High</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
                <span>Command Injection</span>
                <span className="text-red-500">Critical</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
                <span>Weak Hashing</span>
                <span className="text-yellow-400">Medium</span>
              </div>

            </div>

            <div className="mt-8 bg-cyan-500 text-black rounded-xl p-5 text-center font-bold text-xl">
              Security Score : 84 / 100
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}