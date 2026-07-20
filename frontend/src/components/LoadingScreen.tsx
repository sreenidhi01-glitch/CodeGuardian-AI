import { useEffect, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileCode,
  FaSearch,
  FaLock,
  FaRobot,
  FaFilePdf,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCloudUploadAlt />,
    text: "Uploading file...",
  },
  {
    icon: <FaFileCode />,
    text: "Parsing source code...",
  },
  {
    icon: <FaSearch />,
    text: "Detecting programming language...",
  },
  {
    icon: <FaLock />,
    text: "Running Secret Scanner...",
  },
  {
    icon: <FaSearch />,
    text: "Running Static Analysis...",
  },
  {
    icon: <FaSearch />,
    text: "Checking Dependencies...",
  },
  {
    icon: <FaSearch />,
    text: "Performing Architecture Review...",
  },
  {
    icon: <FaRobot />,
    text: "AI Generating Secure Fixes...",
  },
  {
    icon: <FaCheckCircle />,
    text: "Calculating Security Score...",
  },
  {
    icon: <FaFilePdf />,
    text: "Generating Professional Report...",
  },
  {
    icon: <FaCheckCircle />,
    text: "Preparing Dashboard...",
  },
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-10 shadow-2xl">

      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-3">
        Analyzing Your Code
      </h2>

      <p className="text-center text-slate-400 mb-10">
       CodeGuardian AI is performing a comprehensive security audit.
Please wait while we analyze your project...
      </p>

      <div className="space-y-5">

        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-xl p-5 transition-all duration-500 border
            ${
              index < currentStep
                ? "bg-green-500/10 border-green-500"
                : index === currentStep
                ? "bg-cyan-500/10 border-cyan-400 animate-pulse"
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <div className="flex items-center gap-4">

              <div className="text-2xl">

                {index < currentStep ? (
                  <FaCheckCircle className="text-green-400" />
                ) : index === currentStep ? (
                  <FaSpinner className="text-cyan-400 animate-spin" />
                ) : (
                  <span className="text-slate-500">{step.icon}</span>
                )}

              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  {step.text}
                </h3>

                <p className="text-sm text-slate-400">
                  {index < currentStep
                    ? "Completed"
                    : index === currentStep
                    ? "Processing..."
                    : "Waiting"}
                </p>

              </div>

            </div>

            <div className="text-sm">

              {index < currentStep ? (
                <span className="text-green-400 font-semibold">
                  ✓ Done
                </span>
              ) : index === currentStep ? (
                <span className="text-cyan-400 font-semibold">
                  Working...
                </span>
              ) : (
                <span className="text-slate-500">
                  Pending
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <span className="text-slate-300 font-medium">
            Overall Progress
          </span>

          <span className="text-cyan-400 font-bold">
            {progress}%
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      <div className="mt-6 flex justify-between text-sm text-slate-400">

        <span>Estimated Time Remaining</span>

        <span>
          {Math.max(0, Math.ceil((100 - progress) / 25))} sec
        </span>

      </div>

    </div>
  );
}