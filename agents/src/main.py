import os
import asyncio
from dotenv import load_dotenv
from src.zombie_detector_agent import create_zombie_agent

# Load environment variables from .env file in the `agents` directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

async def main():
    """Main function to run the agent locally."""
    print("Initializing FinCortex Zombie Detector Agent...")
    # This automatically picks up Application Default Credentials (ADC) and
    # the GOOGLE_CLOUD_PROJECT environment variable.
    try:
        zombie_agent = create_zombie_agent()
        print("Agent Initialized. Type 'exit' to quit.")
        print("-" * 30)
    except Exception as e:
        print(f"Error during initialization: {e}")
        print("Please ensure you have authenticated with 'gcloud auth application-default login' and set GOOGLE_CLOUD_PROJECT in your .env file.")
        return

    while True:
        try:
            user_input = input("You: ")
            if user_input.lower() == "exit":
                print("Exiting agent chat. Goodbye!")
                break
            if not user_input:
                continue

            # The agent will automatically use tools if the LLM decides it's necessary
            response = zombie_agent.process(user_input)
            print(f"\nAgent: {response['output']}\n")
            print("-" * 30)

        except (KeyboardInterrupt, EOFError):
            print("\nExiting agent chat. Goodbye!")
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            break

if __name__ == "__main__":
    # In a real application, you might use a more robust async library,
    # but asyncio is sufficient for this local runner.
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nScript interrupted by user.")
