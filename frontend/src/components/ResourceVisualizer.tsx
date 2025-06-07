import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';
import { ZombieResource } from '../types';

interface ResourceVisualizerProps {
  resources: ZombieResource[];
  isVisible?: boolean;
  showLegend?: boolean;
}

export function ResourceVisualizer({ resources, isVisible = true, showLegend = false }: ResourceVisualizerProps) {
  if (!isVisible) return null;

  // Pie chart data: resource type distribution
  const resourceTypeData = Object.entries(
    resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // KPIs
  const totalResources = resources.length;
  const totalVMs = resources.filter(r => r.type === 'VM').length;
  const totalZombie = resources.filter(r => r.status === 'Stopped' || r.status === 'Inactive').length;
  const totalCost = resources.reduce((sum, r) => sum + (typeof r.cost === 'number' ? r.cost : 0), 0);
  const avgCPU = resources.length > 0 ? (resources.reduce((sum, r) => sum + (typeof r.cpuUsage === 'number' ? r.cpuUsage : 0), 0) / resources.length) : 0;

  const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#5F6368', '#185ABC'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
      {/* KPIs (left) */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/70 dark:bg-gcp-900/70 rounded-xl p-4 flex flex-col items-start border border-gcp-200 dark:border-gcp-800 shadow-elevation-2 backdrop-blur-xl animate-fade-in">
            <span className="text-xs text-gcp-500 dark:text-gcp-400 font-medium">Total Resources</span>
            <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">{totalResources}</span>
          </div>
          <div className="bg-white/70 dark:bg-gcp-900/70 rounded-xl p-4 flex flex-col items-start border border-gcp-200 dark:border-gcp-800 shadow-elevation-2 backdrop-blur-xl animate-fade-in">
            <span className="text-xs text-gcp-500 dark:text-gcp-400 font-medium">Zombie Resources</span>
            <span className="text-2xl font-bold text-error-600 dark:text-error-400">{totalZombie}</span>
          </div>
          <div className="bg-white/70 dark:bg-gcp-900/70 rounded-xl p-4 flex flex-col items-start border border-gcp-200 dark:border-gcp-800 shadow-elevation-2 backdrop-blur-xl animate-fade-in">
            <span className="text-xs text-gcp-500 dark:text-gcp-400 font-medium">Total VMs</span>
            <span className="text-2xl font-bold text-gcp-900 dark:text-gcp-100">{totalVMs}</span>
          </div>
          <div className="bg-white/70 dark:bg-gcp-900/70 rounded-xl p-4 flex flex-col items-start border border-gcp-200 dark:border-gcp-800 shadow-elevation-2 backdrop-blur-xl animate-fade-in">
            <span className="text-xs text-gcp-500 dark:text-gcp-400 font-medium">Total Cost</span>
            <span className="text-2xl font-bold text-gcp-900 dark:text-gcp-100">${totalCost.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-white/70 dark:bg-gcp-900/70 rounded-xl p-4 flex flex-col items-start border border-gcp-200 dark:border-gcp-800 shadow-elevation-2 backdrop-blur-xl animate-fade-in">
          <span className="text-xs text-gcp-500 dark:text-gcp-400 font-medium">Average CPU Usage</span>
          <span className="text-2xl font-bold text-success-600 dark:text-success-400">{avgCPU.toFixed(1)}%</span>
        </div>
      </div>
      {/* Pie Chart (right) */}
      <div className="bg-white/60 dark:bg-gcp-900/60 p-6 rounded-xl shadow-elevation-2 border border-gcp-200 dark:border-gcp-800 flex flex-col items-center backdrop-blur-xl animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-gcp-900 dark:text-white">Resource Distribution</h3>
        <div className="h-[240px] w-full max-w-xs mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceTypeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {resourceTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {showLegend && (
          <div className="mt-4 grid grid-cols-2 gap-2 animate-fade-in">
            {resourceTypeData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-gcp-700 dark:text-gcp-300">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
