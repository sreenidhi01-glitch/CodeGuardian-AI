import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <FaShieldAlt className="text-cyan-400 text-3xl" />

          <div>
            <h1 className="text-xl font-bold text-white">
              CodeGuardian
              <span className="text-cyan-400"> AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Secure Code Review Assistant
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">

          <a
            href="#features"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Workflow
          </a>

          <a
            href="#dashboard"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Dashboard
          </a>

        </div>

        {/* Start Scan Button */}
        <Link
          to="/scan"
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition"
        >
          Start Scan
        </Link>

      </div>
    </motion.nav>
  );
}