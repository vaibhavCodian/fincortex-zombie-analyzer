import os
from google.adk.agents import LlmAgent
from google.cloud import aiplatform
from src.tools.gcp_compute_tool import list_gce_vms
from src.prompt import INSTRUCTION

def create_zombie_agent() -> LlmAgent:
    """Creates and configures the Zombie Detector Agent."""

    # Initialize Vertex AI
    project = os.environ.get("GOOGLE_CLOUD_PROJECT")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION")
    aiplatform.init(project=project, location=location)

    # Create the LLM Agent
    agent = LlmAgent(
        model="gemini-1.5-flash-001",
        instruction=INSTRUCTION,
        tools=[list_gce_vms],
    )
    return agent
