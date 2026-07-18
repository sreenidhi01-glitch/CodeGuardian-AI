import {
  FaShieldAlt,
  FaRobot,
  FaGithub,
  FaFilePdf,
} from "react-icons/fa";

const items = [
  {
    icon: <FaShieldAlt size={40} />,
    title: "Advanced Security Analysis",
    text: "Detect hardcoded secrets, command injection, weak cryptography, insecure configurations, and more."
  },
  {
    icon: <FaRobot size={40} />,
    title: "AI-Powered Recommendations",
    text: "Understand why a vulnerability exists and receive secure coding examples with explanations."
  },
  {
    icon: <FaGithub size={40} />,
    title: "GitHub Pull Request Review",
    text: "Analyze public pull requests automatically before merging code."
  },
  {
    icon: <FaFilePdf size={40} />,
    title: "Enterprise Reports",
    text: "Generate professional PDF security reports suitable for teams and documentation."
  }
];

export default function WhyCodeGuardian() {
  return (
    <section className="py-28 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Why CodeGuardian AI?
        </h2>

        <p className="text-center text-slate-400 mt-5 max-w-3xl mx-auto">
          Built for developers who want fast, intelligent and actionable
          security reviews before deploying software.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {items.map((item) => (

            <div
              key={item.title}
              className="bg-slate-950 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 transition"
            >
              <div className="text-cyan-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}