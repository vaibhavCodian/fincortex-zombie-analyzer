import React from 'react';
import { mockResources } from './mockData';
import ResourceList from './components/ResourceList';

const App = () => (
  <div style={{ padding: 32 }}>
    <h1>Dev Frontend UI (Mock Data)</h1>
    <ResourceList resources={mockResources} />
  </div>
);

export default App;
