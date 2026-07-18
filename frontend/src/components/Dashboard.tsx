import SecurityGauge from "./SecurityGauge";
import SummaryCards from "./SummaryCards";
import SeverityCards from "./SeverityCards";
import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";

type Props = {
  result: any;
};

function Dashboard({ result }: Props) {
  return (
    <div className="space-y-8 mt-8">

      {/* Top Section */}

      <div className="grid lg:grid-cols-3 gap-8">

        <SecurityGauge score={result.security_score} />

        <div className="lg:col-span-2">
          <SummaryCards
            files={result.files_scanned ?? 1}
            findings={result.total_findings}
            risk={result.risk_level}
          />
        </div>

      </div>

      <SeverityCards findings={result.findings} />

      <div className="grid lg:grid-cols-2 gap-8">

        <PieChartCard findings={result.findings} />

        <BarChartCard findings={result.findings} />

      </div>

    </div>
  );
}

export default Dashboard;