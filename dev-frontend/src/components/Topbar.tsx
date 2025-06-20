import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SidebarToggle } from './SidebarToggle';

interface TopbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function Topbar({ searchQuery, onSearchChange, isCollapsed, onToggleSidebar }: TopbarProps) {
  return (
    <header>
      {/* Topbar content here */}
      <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggleSidebar} />
      <span>FinCortex</span>
      <ThemeToggle />
      {/* Add search, project selector, etc. as needed */}
    </header>
  );
}
