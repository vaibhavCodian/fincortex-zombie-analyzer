export interface ZombieResource {
  id: string;
  name: string;
  type: string;
  region: string;
  status: string;
  labels: string[];
  tags: string[];
  cpuUsage: number;
  lastActive: string;
  agent: string;
  recommendation: string;
  project: string;
  zone: string;
  cost: number;
}

export interface FilterState {
  resourceType: string[];
  region: string[];
  label: string[];
  tags: string[];
  dateRange: string;
  search: string;
}
