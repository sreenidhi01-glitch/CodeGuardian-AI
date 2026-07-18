type Props = {
  findings: any[];
};

function SeverityCards({ findings }: Props) {
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

  const cards = [
    {
      title: "Critical",
      value: critical,
      color: "text-red-500",
      bg: "bg-red-900/20",
    },
    {
      title: "High",
      value: high,
      color: "text-orange-400",
      bg: "bg-orange-900/20",
    },
    {
      title: "Medium",
      value: medium,
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
    },
    {
      title: "Low",
      value: low,
      color: "text-green-400",
      bg: "bg-green-900/20",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-xl p-6 text-center shadow-lg`}
        >
          <h3 className={`text-xl font-bold ${card.color}`}>
            {card.title}
          </h3>

          <p className="text-4xl font-bold mt-4">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SeverityCards;