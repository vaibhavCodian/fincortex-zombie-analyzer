from pydantic import BaseModel, Field
from typing import List, Optional

class VmInstance(BaseModel):
    """Represents a single Google Compute Engine VM instance."""
    name: str = Field(..., description="The name of the VM instance.")
    zone: str = Field(..., description="The zone where the VM instance is located.")
    status: str = Field(..., description="The current status of the VM (e.g., RUNNING, TERMINATED).")
    machine_type: str = Field(..., description="The machine type of the VM.")
    last_start_timestamp: Optional[str] = Field(None, description="The timestamp when the instance was last started. ISO 8601 format.")
    last_stop_timestamp: Optional[str] = Field(None, description="The timestamp when the instance was last stopped. ISO 8601 format.")

class VmList(BaseModel):
    """A list of VM instances."""
    instances: List[VmInstance]
