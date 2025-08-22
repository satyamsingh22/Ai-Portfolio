
from asyncio.log import logger
import os

from livekit import api
from livekit.agents import function_tool



class ToolsetUp:
    """Class to handle tool setup for the voice agent."""
    
    
    def __init__(self,room_name: str=None):
        self.name="ToolSetUp"
        self.livekit_url = os.getenv("LIVEKIT_URL")
        self.livekit_api_key = os.getenv("LIVEKIT_API_KEY")
        self.livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")


        self.room_name = room_name
        
        if not all([self.livekit_url, self.livekit_api_key, self.livekit_api_secret]):
            logger.warning("One or more LiveKit environment variables are not set.")

    def create_end_call_tool(self):
        """Create the end call tool."""

        async def end_call(room_name: str):
            """End the specified call."""
            if not room_name:
                logger.error("Room name not provided")
                return "Failed: Room name not provided"

            client = api.LiveKitAPI(
                self.livekit_url, self.livekit_api_key, self.livekit_api_secret
            )
            try:
                await client.room.remove_participant(
                    api.RoomParticipantIdentity(
                        room=self.room_name,
                        identity="user"
                    )
                )
                await client.aclose()
                return "Call ended successfully"
            except Exception as e:
                logger.error(f"Failed to end call: {e}")
                return f"Failed to end call: {str(e)}"

        return function_tool(
            end_call,
            name="end_call",
            description="Use this when user says bye or wants to end the call"
        )
