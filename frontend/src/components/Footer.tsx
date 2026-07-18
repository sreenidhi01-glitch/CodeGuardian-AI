import { FaGithub, FaShieldAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-3">

            <FaShieldAlt className="text-cyan-400 text-3xl" />

            <div>

              <h2 className="font-bold text-xl">
                CodeGuardian AI
              </h2>

              <p className="text-slate-400 text-sm">
                AI-Powered Secure Code Review Assistant
              </p>

            </div>

          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-6">

            <a
              href="https://github.com"
              className="text-slate-400 hover:text-cyan-400"
            >
              <FaGithub size={24} />
            </a>

            <span className="text-slate-500">
              © 2026 CodeGuardian AI
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}