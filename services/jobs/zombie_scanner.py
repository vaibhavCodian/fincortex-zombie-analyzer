import os
import logging
from datetime import datetime, timedelta

from google.cloud import compute_v1

logging.basicConfig(level=logging.INFO)

def find_idle_vms(project_id, days_idle=30):
    client = compute_v1.InstancesClient()
    request = compute_v1.AggregatedListInstancesRequest(project=project_id)
    idle_vms = []
    for zone, response in client.aggregated_list(request=request):
        for instance in response.instances or []:
            last_start = instance.last_start_timestamp
            if last_start:
                last_start_dt = datetime.strptime(last_start, "%Y-%m-%dT%H:%M:%S.%f%z")
                if datetime.now(last_start_dt.tzinfo) - last_start_dt > timedelta(days=days_idle):
                    idle_vms.append(instance.name)
    return idle_vms

def main():
    project_id = os.environ.get("GCP_PROJECT_ID")
    if not project_id:
        logging.error("GCP_PROJECT_ID environment variable not set.")
        return

    logging.info(f"Scanning project {project_id} for idle VMs...")
    idle_vms = find_idle_vms(project_id)
    if idle_vms:
        logging.info(f"Found idle VMs: {idle_vms}")
    else:
        logging.info("No idle VMs found.")

if __name__ == "__main__":
    main()
