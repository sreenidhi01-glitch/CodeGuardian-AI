import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  findings: any[];
};

function BarChartCard({ findings }: Props) {
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
    { severity: "Critical", count: critical },
    { severity: "High", count: high },
    { severity: "Medium", count: medium },
    { severity: "Low", count: low },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-[400px]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Findings by Severity
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="severity" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCard;