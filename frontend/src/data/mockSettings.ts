// This is a mock for user and GCP auth scope info. Replace with real data fetching as needed.
export const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
  gcpProject: 'fincortex-demo',
  gcpAccount: 'jane.doe@gcp-demo.iam.gserviceaccount.com',
};

export const mockGcpScopes = [
  {
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    description: 'Full access to all Google Cloud resources.'
  },
  {
    scope: 'https://www.googleapis.com/auth/compute',
    description: 'View and manage your Google Compute Engine resources.'
  },
  {
    scope: 'https://www.googleapis.com/auth/sqlservice.admin',
    description: 'Manage your Google Cloud SQL service.'
  }
];
