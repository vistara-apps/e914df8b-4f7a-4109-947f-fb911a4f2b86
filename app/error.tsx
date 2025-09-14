'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="bg-surface rounded-lg shadow-card p-6 max-w-md w-full text-center">
        <div className="text-4xl mb-4">😵</div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Something went wrong!
        </h2>
        <p className="text-text-secondary mb-6">
          We encountered an error while loading your portfolio. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
