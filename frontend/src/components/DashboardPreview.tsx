import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Critical", value: 2 },
  { name: "High", value: 5 },
  { name: "Medium", value: 4 },
  { name: "Low", value: 3 },
];

const barData = [
  { name: "Secrets", value: 5 },
  { name: "Injection", value: 3 },
  { name: "Crypto", value: 2 },
  { name: "Config", value: 4 },
];

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
];

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="max-w-7xl mx-auto py-28 px-6"
    >
      <h2 className="text-5xl font-bold text-center">
        Dashboard Preview
      </h2>

      <p className="text-slate-400 text-center mt-4">
        Interactive analytics generated after every security scan.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 mt-16">

        {/* Left */}

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

          <h3 className="text-2xl font-bold mb-6">
            Severity Distribution
          </h3>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Right */}

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

          <h3 className="text-2xl font-bold mb-6">
            Vulnerability Categories
          </h3>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={barData}>

                <XAxis dataKey="name" />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mt-12">

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-cyan-400 text-lg">
            Security Score
          </h3>

          <p className="text-5xl font-bold mt-4">
            84
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-red-400 text-lg">
            Critical
          </h3>

          <p className="text-5xl font-bold mt-4">
            2
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-orange-400 text-lg">
            High
          </h3>

          <p className="text-5xl font-bold mt-4">
            5
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-green-400 text-lg">
            PDF Report
          </h3>

          <p className="text-xl font-bold mt-4">
            Ready
          </p>
        </div>

      </div>

    </section>
  );
}