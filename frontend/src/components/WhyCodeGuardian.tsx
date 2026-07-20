import {
  FaShieldAlt,
  FaRobot,
  FaGithub,
  FaFilePdf,
} from "react-icons/fa";

const items = [
  {
    icon: <FaShieldAlt className="text-5xl" />,
    title: "Advanced Security Analysis",
    text: "Detect hardcoded secrets, command injection, weak cryptography, insecure configurations, dependency risks, and architecture issues automatically.",
  },
  {
    icon: <FaRobot className="text-5xl" />,
    title: "AI-Powered Recommendations",
    text: "Understand why each vulnerability exists and receive secure coding examples, AI-generated fixes, and best-practice guidance.",
  },
  {
    icon: <FaGithub className="text-5xl" />,
    title: "GitHub Pull Request Review",
    text: "Automatically analyze GitHub Pull Requests before merging code to identify security risks early in the development lifecycle.",
  },
  {
    icon: <FaFilePdf className="text-5xl" />,
    title: "Enterprise Security Reports",
    text: "Generate professional PDF security reports with vulnerability summaries, remediation advice, AI explanations, and risk scores.",
  },
];

export default function WhyCodeGuardian() {
  return (
    <section className="py-24 px-6 bg-slate-900">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <h2 className="text-5xl font-bold text-center text-white">
          Why CodeGuardian AI?
        </h2>

        <p className="text-center text-slate-400 mt-5 max-w-3xl mx-auto text-lg leading-8">
          Built for developers who want fast, intelligent, and actionable
          security reviews before deploying software.
        </p>

        {/* Features */}

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {items.map((item) => (

            <div
              key={item.title}
              className="bg-slate-950 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 hover:shadow-xl transition-all duration-300"
            >

              <div className="text-cyan-400 mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>

        {/* About */}

        <section className="mt-24 bg-slate-950 rounded-2xl p-10 border border-slate-800">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            About CodeGuardian AI
          </h2>

          <p className="text-slate-300 leading-8 text-lg">
            CodeGuardian AI is an AI-powered secure code review assistant
            that automatically detects security vulnerabilities, performs
            static analysis, reviews GitHub Pull Requests, generates
            AI-powered secure code fixes, evaluates project architecture,
            and creates professional PDF security reports. It enables
            developers to identify vulnerabilities early, improve software
            quality, and follow secure coding best practices throughout the
            software development lifecycle.
          </p>

        </section>

        {/* Powered By */}

        <section className="mt-24">

          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">
            Powered By
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {[
              "FastAPI",
              "React",
              "TypeScript",
              "Gemini AI",
              "SQLAlchemy",
              "PyGithub",
              "ReportLab",
              "Tailwind CSS",
            ].map((tech) => (

              <div
                key={tech}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center hover:border-cyan-400 hover:scale-105 transition-all duration-300"
              >
                <p className="font-semibold text-cyan-300 text-lg">
                  {tech}
                </p>
              </div>

            ))}

          </div>

        </section>

      </div>

    </section>
  );
}