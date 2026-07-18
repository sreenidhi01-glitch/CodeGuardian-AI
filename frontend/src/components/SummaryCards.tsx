import {
  FaFolderOpen,
  FaBug,
  FaShieldAlt,
} from "react-icons/fa";

type Props = {
  files: number;
  findings: number;
  risk: string;
};

function SummaryCards({ files, findings, risk }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-slate-800 rounded-xl p-6">
        <FaFolderOpen className="text-3xl text-cyan-400 mb-3" />
        <p>Files Scanned</p>
        <h2>{files}</h2>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <FaBug className="text-3xl text-red-400 mb-3" />
        <p>Findings</p>
        <h2>{findings}</h2>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <FaShieldAlt className="text-3xl text-green-400 mb-3" />
        <p>Risk Level</p>
        <h2>{risk}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;