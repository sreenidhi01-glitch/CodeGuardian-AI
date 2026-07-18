type ReviewProps = {
  review: any;
};

function PRReview({ review }: ReviewProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg">

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        🤖 AI Pull Request Review
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">

        <div className="bg-slate-900 px-5 py-3 rounded-lg">
          <p className="text-slate-400 text-sm">Status</p>
          <p className="text-xl font-bold">
            {review.status}
          </p>
        </div>

        {review.security_score !== undefined && (
          <div className="bg-slate-900 px-5 py-3 rounded-lg">
            <p className="text-slate-400 text-sm">Security Score</p>
            <p className="text-xl font-bold text-cyan-400">
              {review.security_score}/100
            </p>
          </div>
        )}

      </div>

      {review.summary && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-2">
            Summary
          </h3>

          <p className="text-slate-300">
            {review.summary}
          </p>
        </div>
      )}

      {(review.priority_fixes ?? []).length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-400 mb-3">
            🔥 Priority Fixes
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            {(review.priority_fixes ?? []).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {(review.critical || review.high || review.medium || review.low) && (
        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-900/30 rounded-lg p-4">
            <h3 className="font-bold text-red-400">Critical</h3>
            <p className="text-3xl font-bold">
              {(review.critical ?? []).length}
            </p>
          </div>

          <div className="bg-orange-900/30 rounded-lg p-4">
            <h3 className="font-bold text-orange-400">High</h3>
            <p className="text-3xl font-bold">
              {(review.high ?? []).length}
            </p>
          </div>

          <div className="bg-yellow-900/30 rounded-lg p-4">
            <h3 className="font-bold text-yellow-400">Medium</h3>
            <p className="text-3xl font-bold">
              {(review.medium ?? []).length}
            </p>
          </div>

          <div className="bg-green-900/30 rounded-lg p-4">
            <h3 className="font-bold text-green-400">Low</h3>
            <p className="text-3xl font-bold">
              {(review.low ?? []).length}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default PRReview;