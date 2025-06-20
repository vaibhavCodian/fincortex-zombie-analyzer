import React, { useState } from 'react';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { FilterPanel } from './components/FilterPanel';
import { ResourceTable } from './components/ResourceTable';
import { mockZombieResources } from './data/mockData';
import { FilterState } from './types';
import { useSidebar } from './hooks/useSidebar';
import clsx from 'clsx';
import { FaServer, FaBoxOpen, FaDatabase } from 'react-icons/fa';
import { SiKubernetes, SiGooglecloud, SiMinio } from 'react-icons/si';
import SettingsPage from './components/SettingsPage';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [filters, setFilters] = useState<FilterState>({
    resourceType: [],
    region: [],
    label: [],
    tags: [],
    dateRange: '',
    search: '',
  });
  
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  // Filter resources based on active section
  const filteredResourcesBySection = mockZombieResources.filter(resource => {
    switch (activeSection) {
      case 'vm-instances':
        return resource.type === 'VM';
      case 'gke-clusters':
        return resource.type === 'GKE';
      case 'cloud-sql':
        return resource.type === 'SQL';
      case 'storage':
        return resource.type === 'Storage';
      case 'other':
        return !['VM', 'GKE', 'SQL', 'Storage'].includes(resource.type);
      case 'overview':
      default:
        return true;
    }
  });

  const resourceTypeLabels: Record<string, string> = {
    'vm-instances': 'VM Instances',
    'gke-clusters': 'GKE Clusters',
    'cloud-sql': 'Cloud SQL',
    'storage': 'Storage',
    'other': 'Other Resources',
  };

  const resourceTypeIcons: Record<string, React.ReactNode> = {
    'vm-instances': <FaServer className="w-7 h-7 mr-3 inline-block text-primary-500" />,         // VM
    'gke-clusters': <SiKubernetes className="w-7 h-7 mr-3 inline-block text-primary-500" />,     // GKE
    'cloud-sql': <FaDatabase className="w-5 h-5 mr-3 text-primary-500" />,             // SQL
    'storage': <SiMinio className="w-7 h-7 mr-3 inline-block text-primary-500" />,               // Storage
    'other': <FaBoxOpen className="w-7 h-7 mr-3 inline-block text-primary-500" />,               // Other
  };

  if (activeSection === 'settings') {
    return (
      <div className="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-200">
        <Topbar 
          searchQuery={filters.search} 
          onSearchChange={handleSearchChange}
          isCollapsed={isCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <div className="flex">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            isCollapsed={isCollapsed}
            onToggleSidebar={toggleSidebar}
          />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <SettingsPage />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-200">
      <Topbar 
        searchQuery={filters.search} 
        onSearchChange={handleSearchChange}
        isCollapsed={isCollapsed}
        onToggleSidebar={toggleSidebar} // <-- Add this line
      />
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isCollapsed={isCollapsed}
          onToggleSidebar={toggleSidebar} // <-- Add this line
        />
        <main
          className={clsx(
            'flex-1 flex flex-col',
            {
              'ml-64': !isCollapsed,
              'ml-16': isCollapsed,
            }
          )}
        >
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            activeSection={activeSection}
            resourceTypeLabel={
              activeSection === 'overview'
                ? undefined
                : resourceTypeLabels[activeSection] || ''
            }
          />
          <div className="flex-1 p-6">
            <div className="max-w-none">
              <ResourceTable
                resources={filteredResourcesBySection}
                filters={filters}
              />
            </div>
          </div>
          {/* Resource Scanner */}
          <div className="flex w-full px-6 mt-8 justify-start">
            <div className="w-full max-w-5xl bg-white/80 dark:bg-dark-card/80 border border-gcp-200 dark:border-dark-border rounded-xl shadow-elevation-2 backdrop-blur-xl p-6">
              <h2 className="text-headline-small font-medium text-gcp-900 dark:text-gcp-100 mb-4">
                Resource Scanner
              </h2>
              <form
                className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-stretch"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Enter resource name or ID"
                  className="flex-1 px-4 py-3 rounded-l-lg rounded-r-lg sm:rounded-r-none border border-gcp-200 dark:border-dark-border bg-white/70 dark:bg-dark-card/70 text-gcp-900 dark:text-dark-text placeholder-gcp-400 dark:placeholder-dark-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
                <button
                  type="submit"
                  className="sm:ml-0 px-8 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold shadow hover:from-primary-600 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all min-w-[100px] sm:min-w-[120px]"
                  style={{ height: '48px' }}
                >
                  Scan
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;