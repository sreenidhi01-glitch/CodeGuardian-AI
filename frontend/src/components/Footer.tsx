import { FaGithub, FaShieldAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo */}

          <div className="flex items-center gap-4">

            <FaShieldAlt className="text-cyan-400 text-4xl" />

            <div>

              <h2 className="text-2xl font-bold text-white">
                CodeGuardian AI
              </h2>

              <p className="text-slate-400">
                AI-Powered Secure Code Review Assistant
              </p>

            </div>

          </div>

          {/* Center */}

          <div className="text-center">

            <p className="text-slate-300">
              Built with ❤️ by
            </p>

            <h3 className="text-cyan-400 font-bold text-lg">
              Sree Nidhi
            </h3>

            <p className="text-slate-500 text-sm mt-1">
              FastAPI • React • TypeScript • Gemini AI
            </p>

          </div>

          {/* Right */}

          <div className="flex flex-col items-center gap-4">

            <a
              href="https://github.com/sreenidhi01-glitch/CodeGuardian-AI"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition"
            >
              <FaGithub size={30} />
            </a>

            <p className="text-slate-500 text-sm">
              © 2026 CodeGuardian AI
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}