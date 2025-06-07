import React from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isCollapsed, onToggle }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
        'text-gcp-600 dark:text-gcp-200 hover:text-gcp-900 dark:hover:text-white',
        'hover:bg-gcp-100 dark:hover:bg-gcp-700',
        'bg-white',                // Only visible in light mode
        'dark:bg-gcp-800',         // True dark background in dark mode
        'border border-gcp-200 dark:border-gcp-700', // Subtle border for both modes
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gcp-900',
        'active:scale-95',
        'shadow-elevation-1',
        'backdrop-blur-xl'
      )}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      tabIndex={0}
    >
      {isCollapsed ? (
        <Menu className="w-5 h-5 transition-transform duration-200" />
      ) : (
        <X className="w-5 h-5 transition-transform duration-200" />
      )}
    </button>
  );
}