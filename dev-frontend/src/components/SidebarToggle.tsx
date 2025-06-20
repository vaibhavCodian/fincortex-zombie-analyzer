import React from 'react';

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isCollapsed, onToggle }: SidebarToggleProps) {
  return (
    <button onClick={onToggle} aria-label="Toggle sidebar">
      {isCollapsed ? 'Expand' : 'Collapse'}
    </button>
  );
}
