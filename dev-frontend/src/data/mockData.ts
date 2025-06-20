import { ZombieResource } from '../types';

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const baseResources: ZombieResource[] = [
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
  {
    id: '3',
    name: 'legacy-database-01',
    type: 'SQL',
    region: 'europe-west1',
    status: 'Available',
    labels: ['env:staging', 'legacy'],
    tags: ['database', 'mysql'],
    cpuUsage: 0.1,
    lastActive: '2023-03-10T09:15:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Database instance shows no recent connections. Consider deletion.',
    project: 'legacy-systems',
    zone: 'europe-west1-c',
    cost: 89.30
  },
  {
    id: '4',
    name: 'test-instance-worker-02',
    type: 'VM',
    region: 'us-central1',
    status: 'Stopped',
    labels: ['env:test', 'auto-stop'],
    tags: ['testing', 'ci-cd'],
    cpuUsage: 0.0,
    lastActive: '2022-12-01T16:45:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Instance stopped for over 60 days. Safe to delete.',
    project: 'ci-cd-testing',
    zone: 'us-central1-b',
    cost: 0.00
  },
  {
    id: '5',
    name: 'staging-gke-cluster',
    type: 'GKE',
    region: 'us-east1',
    status: 'Inactive',
    labels: ['env:staging', 'team:backend'],
    tags: ['kubernetes', 'staging'],
    cpuUsage: 0.0,
    lastActive: '2023-01-05T11:20:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Cluster has no active workloads. Consider deletion or hibernation.',
    project: 'backend-staging',
    zone: 'us-east1-a',
    cost: 45.60
  },
  {
    id: '6',
    name: 'data-pipeline-vm',
    type: 'VM',
    region: 'asia-southeast1',
    status: 'Running',
    labels: ['env:prod', 'team:data'],
    tags: ['data-processing', 'etl'],
    cpuUsage: 3.2,
    lastActive: '2023-03-25T08:00:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Low utilization for expensive instance type. Consider rightsizing.',
    project: 'data-platform',
    zone: 'asia-southeast1-a',
    cost: 234.70
  },
  {
    id: '7',
    name: 'backup-storage-01',
    type: 'Storage',
    region: 'us-west2',
    status: 'Available',
    labels: ['backup', 'archive'],
    tags: ['storage', 'backup'],
    cpuUsage: 0.0,
    lastActive: '2022-11-15T20:30:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Storage bucket not accessed in 120+ days. Verify if still needed.',
    project: 'backup-systems',
    zone: 'us-west2-a',
    cost: 12.40
  },
  {
    id: '8',
    name: 'load-balancer-dev',
    type: 'LoadBalancer',
    region: 'europe-north1',
    status: 'Available',
    labels: ['env:dev', 'team:infra'],
    tags: ['networking', 'load-balancer'],
    cpuUsage: 0.0,
    lastActive: '2023-02-14T13:45:00Z',
    agent: 'ZombieDetectorAgent',
    recommendation: 'Load balancer has no backend services. Consider removal.',
    project: 'infra-dev',
    zone: 'europe-north1-a',
    cost: 18.20
  }
];

const types = ['VM', 'GKE', 'SQL', 'Storage', 'LoadBalancer'];
const regions = ['us-central1', 'us-east1', 'europe-west1', 'asia-southeast1', 'us-west2', 'europe-north1'];
const statuses = ['Running', 'Stopped', 'Available', 'Inactive'];
const agents = ['ZombieDetectorAgent', 'ResourceOptimizer', 'CostAnalyzer'];
const recommendations = [
  'Delete or shutdown VM. Low CPU usage and no ingress traffic in 30 days.',
  'Consider scaling down cluster. Very low utilization detected.',
  'Database instance shows no recent connections. Consider deletion.',
  'Instance stopped for over 60 days. Safe to delete.',
  'Cluster has no active workloads. Consider deletion or hibernation.',
  'Low utilization for expensive instance type. Consider rightsizing.',
  'Storage bucket not accessed in 120+ days. Verify if still needed.',
  'Load balancer has no backend services. Consider removal.'
];
const projects = ['my-project-dev', 'analytics-prod', 'legacy-systems', 'ci-cd-testing', 'backend-staging', 'data-platform', 'backup-systems', 'infra-dev'];
const zones = ['us-central1-a', 'us-east1-b', 'europe-west1-c', 'asia-southeast1-a', 'us-west2-a', 'europe-north1-a'];
const labelsList = [
  ['env:dev', 'owner:team-alpha'],
  ['env:prod', 'team:analytics'],
  ['env:staging', 'legacy'],
  ['env:test', 'auto-stop'],
  ['env:staging', 'team:backend'],
  ['env:prod', 'team:data'],
  ['backup', 'archive'],
  ['env:dev', 'team:infra']
];
const tagsList = [
  ['development', 'testing'],
  ['kubernetes', 'analytics'],
  ['database', 'mysql'],
  ['testing', 'ci-cd'],
  ['kubernetes', 'staging'],
  ['data-processing', 'etl'],
  ['storage', 'backup'],
  ['networking', 'load-balancer']
];

export const mockZombieResources: ZombieResource[] = [
  ...baseResources,
  ...Array.from({ length: 120 }).map((_, i) => {
    const idx = i % baseResources.length;
    return {
      ...baseResources[idx],
      id: (i + 9).toString(),
      name: `${baseResources[idx].name}-${i + 9}`,
      type: types[i % types.length],
      region: regions[i % regions.length],
      status: statuses[i % statuses.length],
      labels: labelsList[i % labelsList.length],
      tags: tagsList[i % tagsList.length],
      cpuUsage: parseFloat((Math.random() * 5).toFixed(1)),
      lastActive: randomDate(new Date(2022, 0, 1), new Date(2023, 5, 1)),
      agent: agents[i % agents.length],
      recommendation: recommendations[i % recommendations.length],
      project: projects[i % projects.length],
      zone: zones[i % zones.length],
      cost: parseFloat((Math.random() * 300).toFixed(2)),
    };
  })
];

export const uniqueRegions = [...new Set(mockZombieResources.map(r => r.region))];
export const uniqueResourceTypes = [...new Set(mockZombieResources.map(r => r.type))];
export const uniqueLabels = [...new Set(mockZombieResources.flatMap(r => r.labels))];
export const uniqueTags = [...new Set(mockZombieResources.flatMap(r => r.tags))];