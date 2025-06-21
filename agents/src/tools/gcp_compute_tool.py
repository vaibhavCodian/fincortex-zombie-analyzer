import os
from google.cloud import compute_v1
from google.adk.tools import tool
from src.models.compute_models import VmInstance, VmList

@tool
def list_gce_vms(project_id: str) -> VmList:
    """
    Lists all Google Compute Engine (GCE) VM instances in a given GCP project.

    Args:
        project_id: The ID of the Google Cloud project to scan.

    Returns:
        A VmList object containing a list of all found VM instances.
    """
    if not project_id:
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
        if not project_id:
            raise ValueError("GCP Project ID must be provided either as an argument or via the GOOGLE_CLOUD_PROJECT environment variable.")

    client = compute_v1.InstancesClient()
    request = compute_v1.AggregatedListInstancesRequest(project=project_id)

    all_instances = []
    print(f"Scanning project '{project_id}' for VM instances...")

    for zone, response in client.aggregated_list(request=request):
        if response.instances:
            for instance in response.instances:
                # Extract the last part of the URL for machine type and zone
                machine_type_name = instance.machine_type.split('/')[-1]
                zone_name = instance.zone.split('/')[-1]

                vm_data = VmInstance(
                    name=instance.name,
                    zone=zone_name,
                    status=instance.status,
                    machine_type=machine_type_name,
                    last_start_timestamp=instance.last_start_timestamp,
                    last_stop_timestamp=instance.last_stop_timestamp,
                )
                all_instances.append(vm_data)

    print(f"Found {len(all_instances)} instances.")
    return VmList(instances=all_instances)
