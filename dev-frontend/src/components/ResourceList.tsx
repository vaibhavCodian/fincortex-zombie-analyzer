import React from 'react';

type Resource = {
  id: number;
  name: string;
  type: string;
  status: string;
};

const ResourceList = ({ resources }: { resources: Resource[] }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {resources.map(r => (
        <tr key={r.id}>
          <td>{r.name}</td>
          <td>{r.type}</td>
          <td>{r.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResourceList;
