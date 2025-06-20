import React, { useMemo, useState } from 'react';
import { ExternalLink, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { StatusChip } from './StatusChip';
import { ResourceVisualizer } from './ResourceVisualizer';
import { useMultiSort } from '../hooks/useMultiSort';
import { ZombieResource, FilterState } from '../types';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';
import { FaServer, FaBoxOpen, FaDatabase } from 'react-icons/fa';
import { SiKubernetes, SiMinio } from 'react-icons/si';
import { SortableHeader } from './SortableHeader';

interface ResourceTableProps {
  resources: ZombieResource[];
  filters: FilterState;
}

export function ResourceTable({ resources, filters }: ResourceTableProps) {
  const [showKPI, setShowKPI] = React.useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

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

  // Pagination logic
  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page]);

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
            <>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y divide-gcp-200 dark:divide-gcp-800">
                  <thead className="bg-white/80 dark:bg-gcp-900/80 sticky top-0 z-10 shadow-sm backdrop-blur-xl">
                    <tr>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="name"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('name')}
                        >Resource Name</SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="type"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('type')}
                        >Type</SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="region"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('region')}
                        >Region</SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="status"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('status')}
                        >Status</SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="lastActive"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('lastActive')}
                        >Last Active</SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="cpuUsage"
                          onSort={handleSort}
                          sortIndicator={getSortIndicator('cpuUsage')}
                        >CPU Usage</SortableHeader>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/70 dark:bg-gcp-900/70 divide-y divide-gcp-200 dark:divide-gcp-800">
                    {paginatedData.map(resource => (
                      <tr key={resource.id} className="hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-all duration-150 animate-fade-in">
                        {/* Example cells, replace with your actual data */}
                        <td className="px-6 py-4 whitespace-nowrap text-gcp-900 dark:text-gcp-100 font-medium">{resource.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gcp-700 dark:text-gcp-200">{resource.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gcp-700 dark:text-gcp-200">{resource.region}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={resource.status} size="sm" /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-gcp-500 dark:text-gcp-400">{formatLastActive(resource.lastActive)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-primary-600 dark:text-primary-400 font-semibold">{resource.cpuUsage?.toFixed(1)}%</td>
                        {/* Remove Actions cell */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-end items-center gap-2 px-6 py-4 bg-white/80 dark:bg-gcp-900/80 border-t border-gcp-200 dark:border-dark-border">
                <button
                  className="px-3 py-1 rounded bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200 text-sm font-medium disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-primary-500 text-white' : 'bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200'} text-sm font-medium`}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200 text-sm font-medium disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}