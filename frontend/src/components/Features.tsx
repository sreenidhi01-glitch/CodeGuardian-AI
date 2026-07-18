import {
  FaGithub,
  FaShieldAlt,
  FaFilePdf,
  FaRobot,
  FaBug,
  FaChartPie,
} from "react-icons/fa";

const features = [
  {
    icon: <FaGithub size={32} />,
    title: "GitHub PR Review",
    desc: "Analyze public GitHub pull requests with AI-powered security review.",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Security Scanner",
    desc: "Detect secrets, insecure code, weak cryptography and dangerous patterns.",
  },
  {
    icon: <FaRobot size={32} />,
    title: "AI Recommendations",
    desc: "Understand why an issue matters and learn secure coding practices.",
  },
  {
    icon: <FaBug size={32} />,
    title: "Static Analysis",
    desc: "Automatically detect vulnerabilities before deployment.",
  },
  {
    icon: <FaChartPie size={32} />,
    title: "Visual Dashboard",
    desc: "Interactive charts, severity breakdown and security score.",
  },
  {
    icon: <FaFilePdf size={32} />,
    title: "Professional PDF",
    desc: "Generate enterprise-ready security assessment reports.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto py-28 px-6"
    >
      <h2 className="text-5xl font-bold text-center">
        Everything You Need
      </h2>

      <p className="text-slate-400 text-center mt-5 max-w-3xl mx-auto">
        CodeGuardian AI combines static analysis, AI review,
        GitHub integration and professional reporting into one platform.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 transition"
          >
            <div className="text-cyan-400 mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}