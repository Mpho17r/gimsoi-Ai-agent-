import React from 'react';

interface ContributorWorkload {
  name: string;
  department: string;
  activeTasks: number;
  status: 'BALANCED' | 'MODERATE' | 'OVERLOADED';
}

const WorkloadHeatmap: React.FC<{ contributors: ContributorWorkload[] }> = ({ contributors }) => {
  const getColor = (status: string) => {
    switch(status) {
      case 'BALANCED': return 'bg-green-200';
      case 'MODERATE': return 'bg-yellow-200';
      case 'OVERLOADED': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Workload Heat Map</h3>
      <div className="grid gap-2">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <span>{contributor.name}</span>
            <span className="text-sm text-gray-500">{contributor.department}</span>
            <span className={`px-2 py-1 rounded ${getColor(contributor.status)}`}>
              {contributor.activeTasks} tasks
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <span className="flex items-center"><span className="w-3 h-3 bg-green-200 rounded mr-1"></span> Balanced</span>
        <span className="flex items-center"><span className="w-3 h-3 bg-yellow-200 rounded mr-1"></span> Moderate</span>
        <span className="flex items-center"><span className="w-3 h-3 bg-red-200 rounded mr-1"></span> Overloaded</span>
      </div>
    </div>
  );
};

export default WorkloadHeatmap;
