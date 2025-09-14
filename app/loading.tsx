export default function Loading() {
  return (
    <div className="min-h-screen bg-bg px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header skeleton */}
        <div className="animate-pulse mb-6">
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        {/* Total P&L skeleton */}
        <div className="bg-surface rounded-lg shadow-card p-6 mb-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>

        {/* Holdings list skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-lg shadow-card p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
