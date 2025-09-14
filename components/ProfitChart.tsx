'use client';

interface ProfitChartProps {
  isProfit: boolean;
}

export function ProfitChart({ isProfit }: ProfitChartProps) {
  // Simple SVG chart representation
  const chartColor = isProfit ? '#22c55e' : '#ef4444';
  
  return (
    <div className="h-20 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 80"
        className="overflow-visible"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Chart line */}
        <path
          d={isProfit 
            ? "M 0 60 Q 50 50 100 45 T 200 35 T 300 25"
            : "M 0 20 Q 50 30 100 35 T 200 45 T 300 55"
          }
          fill="none"
          stroke={chartColor}
          strokeWidth="2"
          className="animate-fade-in"
        />
        
        {/* Fill area */}
        <path
          d={isProfit 
            ? "M 0 60 Q 50 50 100 45 T 200 35 T 300 25 L 300 80 L 0 80 Z"
            : "M 0 20 Q 50 30 100 35 T 200 45 T 300 55 L 300 80 L 0 80 Z"
          }
          fill={`${chartColor}20`}
          className="animate-fade-in"
        />
        
        {/* Data points */}
        {[75, 150, 225].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={isProfit ? 40 - i * 5 : 30 + i * 5}
            r="3"
            fill={chartColor}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
