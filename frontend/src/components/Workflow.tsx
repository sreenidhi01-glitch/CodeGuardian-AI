import {
  FaUpload,
  FaSearch,
  FaRobot,
  FaChartLine,
  FaFilePdf,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload size={34} />,
    title: "Upload Code",
    desc: "Upload a source file or analyze a GitHub Pull Request.",
  },
  {
    icon: <FaSearch size={34} />,
    title: "Security Scan",
    desc: "Static analysis detects vulnerabilities, secrets and risky code.",
  },
  {
    icon: <FaRobot size={34} />,
    title: "AI Review",
    desc: "AI explains every issue and recommends secure coding practices.",
  },
  {
    icon: <FaChartLine size={34} />,
    title: "Visual Dashboard",
    desc: "Interactive analytics with security score and severity charts.",
  },
  {
    icon: <FaFilePdf size={34} />,
    title: "Export Report",
    desc: "Download a professional PDF security assessment instantly.",
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="max-w-7xl mx-auto py-28 px-6"
    >
      <h2 className="text-5xl font-bold text-center">
        How It Works
      </h2>

      <p className="text-slate-400 text-center mt-5 max-w-3xl mx-auto">
        A simple workflow powered by AI that helps developers identify,
        understand, and fix security vulnerabilities before deployment.
      </p>

      <div className="mt-20 relative">

        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-cyan-500 hidden lg:block"></div>

        <div className="space-y-12">

          {steps.map((step, index) => (

            <div
              key={step.title}
              className={`flex items-center gap-8 ${
                index % 2 === 0
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
              }`}
            >

              <div className="flex-1">

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                  <div className="text-cyan-400 mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 mt-4">
                    {step.desc}
                  </p>

                </div>

              </div>

              <div className="hidden lg:flex w-14 h-14 rounded-full bg-cyan-500 text-black font-bold items-center justify-center">
                {index + 1}
              </div>

              <div className="flex-1"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}