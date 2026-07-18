import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  findings: any[];
};

function PieChartCard({ findings }: Props) {
  const critical = findings.filter(
    (f) => f.severity?.toLowerCase() === "critical"
  ).length;

  const high = findings.filter(
    (f) => f.severity?.toLowerCase() === "high"
  ).length;

  const medium = findings.filter(
    (f) => f.severity?.toLowerCase() === "medium"
  ).length;

  const low = findings.filter(
    (f) => f.severity?.toLowerCase() === "low"
  ).length;

  const data = [
    { name: "Critical", value: critical },
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-[400px]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Severity Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartCard;