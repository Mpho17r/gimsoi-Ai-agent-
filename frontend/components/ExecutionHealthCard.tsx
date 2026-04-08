import React from 'react';

interface ExecutionHealthCardProps {
  healthScore: number;
  riskFlags: string[];
  sprintId: string;
}

const ExecutionHealthCard: React.FC<ExecutionHealthCardProps> = ({ healthScore, riskFlags, sprintId }) => {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Execution Health Score</h3>
      <div className="text-4xl font-bold mb-2">
        <span className={getHealthColor(healthScore)}>{healthScore}%</span>
      </div>
      {riskFlags.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-red-600">{riskFlags.length} Risk Flags Identified</p>
          <ul className="mt-2 space-y-1">
            {riskFlags.map((flag, index) => (
              <li key={index} className="text-sm text-gray-600">• {flag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExecutionHealthCard;
