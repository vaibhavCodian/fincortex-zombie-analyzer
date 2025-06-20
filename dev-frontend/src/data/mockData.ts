import { ZombieResource } from '../types';

export const mockZombieResources: ZombieResource[] = [
  {
    id: '1',
    name: 'dev-instance-01',
    type: 'VM',
    region: 'us-central1',
    status: 'Running',
    labels: ['env:dev', 'owner:team-alpha'],
    tags: ['development', 'testing'],
    cpuUsage: 1.2,
    lastActive: '2023-01-15T10:00:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Delete or shutdown VM. Low CPU usage and no ingress traffic in 30 days.',
    project: 'my-project-dev',
    zone: 'us-central1-a',
    cost: 24.50
  },
  {
    id: '2',
    name: 'analytics-cluster-01',
    type: 'GKE',
    region: 'us-east1',
    status: 'Running',
    labels: ['env:prod', 'team:analytics'],
    tags: ['kubernetes', 'analytics'],
    cpuUsage: 0.5,
    lastActive: '2023-02-20T14:30:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Consider scaling down cluster. Very low utilization detected.',
    project: 'analytics-prod',
    zone: 'us-east1-b',
    cost: 156.80
  },
  // ...more mock data as needed
];
