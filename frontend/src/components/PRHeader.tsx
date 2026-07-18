type HeaderProps = {
  review: any;
};

function PRHeader({ review }: HeaderProps) {
  const today = new Date().toLocaleDateString();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 shadow-lg">

      <div className="flex flex-wrap justify-between items-center gap-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            ecommerce-api
          </h1>

          <p className="text-slate-400 mt-1">
            Pull Request #42 • feature/security-review
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Reviewed by <span className="text-cyan-400">CodeGuardian AI</span> • {today}
          </p>
        </div>

        <div>

          <span
            className={`px-5 py-3 rounded-full text-lg font-bold ${
              review.status.includes("Approved")
                ? "bg-green-600"
                : review.status.includes("Warning")
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            {review.status}
          </span>

        </div>

      </div>

    </div>
  );
}

export default PRHeader;