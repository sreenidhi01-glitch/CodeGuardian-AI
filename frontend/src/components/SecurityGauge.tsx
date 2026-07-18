import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  score: number;
};

function SecurityGauge({ score }: Props) {
  let color = "#22c55e";

  if (score < 80) color = "#eab308";
  if (score < 60) color = "#f97316";
  if (score < 40) color = "#ef4444";

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-cyan-400">
        Security Score
      </h2>

      <div className="w-44 h-44">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: color,
            trailColor: "#1e293b",
            textSize: "18px",
          })}
        />
      </div>
    </div>
  );
}

export default SecurityGauge;