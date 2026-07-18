import { useEffect, useState } from "react";
import {
  FaSearch,
  FaLock,
  FaRobot,
  FaFilePdf,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    text: "Running Static Analysis...",
  },
  {
    icon: <FaLock />,
    text: "Scanning for Secrets...",
  },
  {
    icon: <FaRobot />,
    text: "Generating AI Review...",
  },
  {
    icon: <FaFilePdf />,
    text: "Preparing Security Report...",
  },
];

export default function LoadingScreen() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev === steps.length - 1) return prev;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-10 border border-cyan-500 shadow-2xl">

      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">
        Analyzing Your Code...
      </h2>

      <div className="space-y-5">

        {steps.map((step, index) => (

          <div
            key={step.text}
            className={`flex items-center gap-4 p-4 rounded-xl transition ${
              index <= current
                ? "bg-green-500/20"
                : "bg-slate-800"
            }`}
          >

            {index < current ? (
              <FaCheckCircle className="text-green-400 text-xl" />
            ) : (
              <span className="text-cyan-400 text-xl">
                {step.icon}
              </span>
            )}

            <span>{step.text}</span>

          </div>

        ))}

      </div>

      <div className="mt-10">

        <div className="h-3 rounded-full bg-slate-700">

          <div
            className="h-3 rounded-full bg-cyan-500 transition-all duration-1000"
            style={{
              width: `${((current + 1) / steps.length) * 100}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}