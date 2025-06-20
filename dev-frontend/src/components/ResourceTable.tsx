import React, { useMemo } from 'react';
import { ExternalLink, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { StatusChip } from './StatusChip';
import { ResourceVisualizer } from './ResourceVisualizer';
import { useMultiSort } from '../hooks/useMultiSort';
import { ZombieResource, FilterState } from '../types';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';
import { FaServer, FaBoxOpen, FaDatabase } from 'react-icons/fa';
import { SiKubernetes, SiMinio } from 'react-icons/si';

interface ResourceTableProps {
  resources: ZombieResource[];
  filters: FilterState;
}

export function ResourceTable({ resources, filters }: ResourceTableProps) {
  const [showKPI, setShowKPI] = React.useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableFields = [
          resource.name,
          resource.type,
          resource.region,
          resource.status,
          resource.agent,
          resource.recommendation,
          ...resource.labels,
          ...resource.tags,
        ].join(' ').toLowerCase();
        
        if (!searchableFields.includes(searchLower)) {
          return false;
        }
      }

      // Resource type filter
      if (filters.resourceType.length > 0 && !filters.resourceType.includes(resource.type)) {
        return false;
      }

      // Region filter
      if (filters.region.length > 0 && !filters.region.includes(resource.region)) {
        return false;
      }

      // Label filter
      if (filters.label.length > 0) {
        const hasMatchingLabel = filters.label.some(label => 
          resource.labels.includes(label)
        );
        if (!hasMatchingLabel) {
          return false;
        }
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          resource.tags.includes(tag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [resources, filters]);

  const { sortedData, handleSort, getSortIndicator, clearSort } = useMultiSort(filteredResources);

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="bg-white/70 dark:bg-dark-card/80 rounded-xl shadow-elevation-2 overflow-hidden border border-gcp-200 dark:border-dark-border backdrop-blur-xl animate-fade-in transition-all duration-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gcp-200 dark:border-dark-border bg-white/80 dark:bg-gcp-900/80 sticky top-0 z-10 shadow-sm backdrop-blur-xl">
        {/* Add KPI toggle and sticky header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gcp-900 dark:text-gcp-100">Zombie Resources</h2>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white text-sm font-medium shadow-elevation-1 transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
              onClick={() => setShowKPI(v => !v)}
            >
              {showKPI ? 'Table' : 'KPIs'}
            </button>
            {sortedData.length > 0 && (
              <button
                className="px-3 py-1 rounded-lg bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200 text-sm font-medium hover:bg-gcp-200 dark:hover:bg-gcp-700 transition-colors"
                onClick={clearSort}
              >
                Clear Sort
              </button>
            )}
          </div>
        </div>
      </div>
      {/* KPI/Graph View or Table */}
      {showKPI ? (
        <div className="p-6 bg-white/80 dark:bg-gcp-900/80 rounded-b-xl animate-fade-in">
          <ResourceVisualizer resources={filteredResources} isVisible={true} showLegend />
        </div>
      ) : (
        <>
          {sortedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              {/* Empty state illustration */}
              <svg width="80" height="80" fill="none" viewBox="0 0 80 80" className="mb-4">
                <circle cx="40" cy="40" r="38" stroke="#E0E7EF" strokeWidth="4" fill="#F8FAFC" />
                <rect x="22" y="32" width="36" height="16" rx="4" fill="#E0E7EF" />
                <rect x="28" y="38" width="24" height="4" rx="2" fill="#B6C2D9" />
              </svg>
              <span className="text-gcp-500 dark:text-gcp-400 text-base font-medium">No resources found for the selected filters.</span>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gcp-200 dark:divide-gcp-800">
                <thead className="bg-white/80 dark:bg-gcp-900/80 sticky top-[64px] z-10 shadow-sm backdrop-blur-xl">
                  <tr>
                    {/* Example headers, replace with your actual columns */}
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Resource Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">CPU Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gcp-500 dark:text-gcp-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/70 dark:bg-gcp-900/70 divide-y divide-gcp-200 dark:divide-gcp-800">
                  {sortedData.map(resource => (
                    <tr key={resource.id} className="hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-all duration-150 animate-fade-in">
                      {/* Example cells, replace with your actual data */}
                      <td className="px-6 py-4 whitespace-nowrap text-gcp-900 dark:text-gcp-100 font-medium">{resource.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gcp-700 dark:text-gcp-200">{resource.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gcp-700 dark:text-gcp-200">{resource.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={resource.status} size="sm" /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-gcp-500 dark:text-gcp-400">{formatLastActive(resource.lastActive)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-primary-600 dark:text-primary-400 font-semibold">{resource.cpuUsage?.toFixed(1)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        {/* Action icons with tooltips and feedback */}
                        <Tooltip content="View Details">
                          <button className="p-2 rounded-lg hover:bg-primary-100/60 dark:hover:bg-primary-900/30 transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <svg className="w-5 h-5 text-gcp-500 dark:text-gcp-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </Tooltip>
                        <Tooltip content="Edit Resource">
                          <button className="p-2 rounded-lg hover:bg-primary-100/60 dark:hover:bg-primary-900/30 transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <svg className="w-5 h-5 text-gcp-500 dark:text-gcp-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11-11a2.828 2.828 0 00-4-4L5 17v4z" /></svg>
                          </button>
                        </Tooltip>
                        <Tooltip content="Delete Resource">
                          <button className="p-2 rounded-lg hover:bg-error-100/60 dark:hover:bg-error-900/30 transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-error-500">
                            <svg className="w-5 h-5 text-error-500 dark:text-error-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zm0 0V3m0 2v2" /></svg>
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}