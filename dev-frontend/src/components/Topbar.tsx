import React from 'react';
import { Search, ChevronDown, Bell, HelpCircle, Grid3X3, User, Cloud } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SidebarToggle } from './SidebarToggle'; // Import if you have this component

interface TopbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function Topbar({ searchQuery, onSearchChange, isCollapsed, onToggleSidebar }: TopbarProps) {
  // Dummy project list for selector
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState({
    name: 'My Project',
    id: 'my-project-123',
    color: 'bg-primary-500',
  });
  const projects = [
    { name: 'My Project', id: 'my-project-123', color: 'bg-primary-500' },
    { name: 'Analytics', id: 'analytics-456', color: 'bg-success-500' },
    { name: 'Legacy', id: 'legacy-789', color: 'bg-warning-500' },
  ];
  const [recentProjects] = React.useState([
    { name: 'Analytics', id: 'analytics-456', color: 'bg-success-500' },
    { name: 'Legacy', id: 'legacy-789', color: 'bg-warning-500' },
  ]);

  return (
    <header className="h-16 bg-white/80 dark:bg-gcp-900/80 border-b border-gcp-200 dark:border-gcp-700 px-4 flex items-center justify-between shadow-elevation-1 relative z-10 backdrop-blur-md">
      {/* Left: Logo and sidebar toggle */}
      <div className="flex items-center min-w-0">
        <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggleSidebar} />
        <div className="flex items-center space-x-2 mt-1 ml-8"> 
          <Cloud className="w-10 h-6 text-primary-500 flex-shrink-0" />
          <span className="text-title-large font-medium text-gcp-900 dark:text-gcp-100">FinCortex</span>
        </div>
      </div>
      {/* Center: Search Field */}
      <div className="flex-1 flex justify-center mx-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gcp-500 dark:text-gcp-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gcp-50 dark:bg-gcp-800 border border-gcp-200 dark:border-gcp-700 rounded-xl text-body-medium text-gcp-900 dark:text-gcp-100 placeholder:text-gcp-500 dark:placeholder:text-gcp-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:bg-white dark:hover:bg-gcp-700"
          />
        </div>
      </div>
      {/* Right: Project Selector + Actions */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Project Selector Dropdown */}
        <div className="relative min-w-[180px] max-w-[220px]">
          <button
            className="flex items-center space-x-2 px-3 py-2 bg-white/60 dark:bg-gcp-800/60 border border-gcp-200 dark:border-gcp-700 rounded-md shadow-lg backdrop-blur-md hover:bg-white/80 dark:hover:bg-gcp-700/80 transition-colors cursor-pointer select-none min-w-[160px]"
            onClick={() => setProjectDropdownOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={projectDropdownOpen}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedProject.color} text-white text-xs font-bold`}><User className="w-4 h-4" /></span>
            <span className="text-body-medium text-gcp-700 dark:text-gcp-300 truncate">{selectedProject.name}</span>
            <ChevronDown className="w-4 h-4 text-gcp-500 dark:text-gcp-400" />
          </button>
          {projectDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72
                bg-white/95 dark:bg-gcp-900
                border border-gcp-200 dark:border-gcp-700
                rounded-md shadow-2xl z-30 backdrop-blur-[18px] animate-fade-in">
              <div className="px-4 py-3 border-b border-gcp-100 dark:border-gcp-800">
                <div className="font-semibold text-gcp-800 dark:text-gcp-100">Select Project</div>
              </div>
              <div className="py-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors text-gcp-700 dark:text-gcp-200 text-sm ${selectedProject.id === proj.id ? 'bg-primary-100/60 dark:bg-primary-900/20 font-semibold' : ''}`}
                    onClick={() => { setSelectedProject(proj); setProjectDropdownOpen(false); }}
                    type="button"
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${proj.color} text-white text-xs font-bold`}><User className="w-4 h-4" /></span>
                    <span>{proj.name}</span>
                    <span className="ml-auto text-xs text-gcp-400">{proj.id}</span>
                    {selectedProject.id === proj.id && <span className="ml-2 text-primary-500">✓</span>}
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gcp-100 dark:border-gcp-800">
                <div className="text-xs text-gcp-500 dark:text-gcp-400 mb-1">Recent Projects</div>
                <div className="flex gap-2">
                  {recentProjects.map((proj) => (
                    <button
                      key={proj.id}
                      className={`flex items-center gap-1 px-2 py-1 rounded bg-white/40 dark:bg-gcp-800/40 border border-gcp-200 dark:border-gcp-700 shadow-sm hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors text-gcp-700 dark:text-gcp-200 text-xs ${selectedProject.id === proj.id ? 'ring-2 ring-primary-400' : ''}`}
                      onClick={() => { setSelectedProject(proj); setProjectDropdownOpen(false); }}
                      type="button"
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${proj.color} text-white text-xs font-bold`}><User className="w-3 h-3" /></span>
                      <span>{proj.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-2 text-xs text-gcp-500 dark:text-gcp-400 border-t border-gcp-100 dark:border-gcp-800">Project switching is local only (mocked)</div>
            </div>
          )}
        </div>
        {/* Actions and Theme Toggle */}
        <button className="p-2 text-gcp-600 dark:text-gcp-400 hover:text-gcp-900 
                          dark:hover:text-gcp-100 hover:bg-gcp-100 dark:hover:bg-gcp-800 
                          rounded-lg transition-colors focus:outline-none focus:ring-2 
                          focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gcp-900">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-gcp-600 dark:text-gcp-400 hover:text-gcp-900 
                          dark:hover:text-gcp-100 hover:bg-gcp-100 dark:hover:bg-gcp-800 
                          rounded-lg transition-colors focus:outline-none focus:ring-2 
                          focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gcp-900">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gcp-600 dark:text-gcp-400 hover:text-gcp-900 
                          dark:hover:text-gcp-100 hover:bg-gcp-100 dark:hover:bg-gcp-800 
                          rounded-lg transition-colors focus:outline-none focus:ring-2 
                          focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gcp-900">
          <Grid3X3 className="w-5 h-5" />
        </button>
        <ThemeToggle />
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center 
                        text-white text-label-medium font-medium cursor-pointer
                        hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 
                        focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gcp-900">
          U
        </div>
      </div>
    </header>
  );
}