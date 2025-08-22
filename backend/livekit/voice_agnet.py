import os
import time

from dotenv import load_dotenv
from livekit.agents import (
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
)
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import silero
from livekit.plugins import  openai, deepgram
# from tool_setup import ToolsetUp
from system_prompt import SYSTEM_PROMPT

load_dotenv()
livekit_url = os.getenv("LIVEKIT_URL")
livekit_api_key = os.getenv("LIVEKIT_API_KEY")
livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")


def get_current_epoch():
    """Get the current epoch time."""
    return int(time.time())


class VoiceAgent(Agent):
    """Voice agent that listens to the user and responds with text."""

    def __init__(self,  job_context: JobContext) -> None:
        self.job_context = job_context
        self.system_prompt = SYSTEM_PROMPT
        
        

        llm = openai.LLM(
                    model="gpt-4o",
                    temperature=float("0.7"),
                    api_key=OPENAI_KEY,
                )
        stt = deepgram.STT(
                    model="nova-3",
                    language="en-US",
                    api_key=DEEPGRAM_API_KEY,
                    punctuate=False,
                )
        tts = openai.TTS(
            model="tts-1",  
            # voice="onyx",     
            api_key=OPENAI_KEY,
            # speed=1.2,         # optional, adjust as needed
        )
        
        # tool_setup = ToolsetUp(room_name=job_context.room.name)
        # tools = tool_setup.setup_tools()
        
        super().__init__(
            instructions=self.system_prompt,
            stt=stt,
            llm=llm,
            tts=tts,
            vad=silero.VAD.load(),
            # tools=tools,
        )

    async def on_enter(self):
        self.session.generate_reply(
            instructions= f"You are not an ai agent you are human name 'Satyam Singh' as Senior Software Engineer so talk like human in casual way and never say that you are ai agent. Before starting any conversation introduce yourself like 'Hi, Satyam Singh this side — I'm a Senior Software Engineer at Kipps AI. Just curious — are you looking to collaborate on a project, need some technical insights, want me to build a project for you, or simply want to get to know me better?'",
            allow_interruptions=True,
        )


async def entrypoint(ctx: JobContext):
    """Entrypoint for the voice agent."""
    await ctx.connect()
    messages = []
    session = AgentSession()
    
    await session.start(agent=VoiceAgent(ctx), room=ctx.room)

    @session.on("conversation_item_added")
    def on_transcript(event):
        print("TRANSCRIPT EVENT:", event.item.role, event.item.content)
        messages.append(
            {"role": event.item.role, "content": event.item.content}
        )
    
    def end_call():
        session.aclose()

    ctx.room.on("participant_disconnected", end_call)

def prewarm_process(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm_process,
        )
    )

