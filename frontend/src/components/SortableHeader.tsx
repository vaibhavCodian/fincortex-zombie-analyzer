import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import clsx from 'clsx';

interface SortableHeaderProps {
  children: React.ReactNode;
  sortKey: string;
  onSort: (key: string, isShiftClick: boolean) => void;
  sortIndicator: {
    direction: 'asc' | 'desc';
    priority: number | null;
  } | null;
  className?: string;
}

export function SortableHeader({ 
  children, 
  sortKey, 
  onSort, 
  sortIndicator, 
  className 
}: SortableHeaderProps) {
  const handleClick = (e: React.MouseEvent) => {
    onSort(sortKey, e.shiftKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSort(sortKey, e.shiftKey);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'flex items-center space-x-1 text-left w-full group',
        'text-label-medium font-medium text-gcp-700 dark:text-gcp-300',
        'hover:text-gcp-900 dark:hover:text-gcp-100 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:focus:ring-offset-gcp-900 rounded-sm',
        className
      )}
      title={`Sort by ${children}${sortIndicator?.priority ? ` (Priority ${sortIndicator.priority})` : ''}`}
    >
      <span className="flex-1">{children}</span>
      <div className="flex items-center space-x-1">
        {sortIndicator?.priority && (
          <span className="text-label-small text-primary-600 dark:text-primary-400 font-medium">
            {sortIndicator.priority}
          </span>
        )}
        <div className="w-4 h-4 flex items-center justify-center">
          {!sortIndicator ? (
            <ChevronsUpDown className="w-3 h-3 text-gcp-400 dark:text-gcp-600 
                                     group-hover:text-gcp-600 dark:group-hover:text-gcp-400 
                                     transition-colors" />
          ) : sortIndicator.direction === 'asc' ? (
            <ChevronUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          )}
        </div>
      </div>
    </button>
  );
}