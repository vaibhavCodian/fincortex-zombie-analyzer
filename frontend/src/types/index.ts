export interface ZombieResource {
  id: string;
  name: string;
  type: 'VM' | 'GKE' | 'SQL' | 'Storage' | 'LoadBalancer';
  region: string;
  status: 'Running' | 'Stopped' | 'Inactive' | 'Available' | 'Error';
  labels: string[];
  tags: string[];
  cpuUsage: number;
  lastActive: string;
  agent: string;
  recommendation: string;
  project?: string;
  zone?: string;
  cost?: number;
}

export interface FilterState {
  resourceType: string[];
  region: string[];
  label: string[];
  tags: string[];
  dateRange: string;
  search: string;
}

export interface SortConfig {
  key: keyof ZombieResource | null;
  direction: 'asc' | 'desc';
}