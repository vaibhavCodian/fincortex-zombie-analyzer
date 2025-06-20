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

const App = () => {
  const [filter, setFilter] = useState<FilterState>({
    text: '',
    status: 'all',
    type: 'all',
  });

  const { isOpen, toggle } = useSidebar();

  return (
    <div style={{ display: 'flex', padding: 32 }}>
      <Topbar toggleSidebar={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <div style={{ flex: 1, marginLeft: 240 }}>
        <h1>Dev Frontend UI (Mock Data)</h1>
        <FilterPanel filter={filter} setFilter={setFilter} />
        <ResourceTable resources={mockZombieResources} filter={filter} />
      </div>
    </div>
  );
};

export default App;
