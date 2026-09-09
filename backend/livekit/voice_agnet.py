import os
import time
from pathlib import Path

from dotenv import load_dotenv
from livekit.agents import (
    JobContext,
    WorkerOptions,
    cli,
)
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import openai, sarvam
from system_prompt import get_voice_prompt

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
livekit_url = os.getenv("LIVEKIT_URL")
livekit_api_key = os.getenv("LIVEKIT_API_KEY")
livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

SUPPORTED_TTS_LANGUAGES = {"en-IN", "hi-IN", "ta-IN", "bn-IN"}
DEFAULT_TTS_LANGUAGE = "en-IN"


def profile_from_room(room_name: str) -> str:
    if room_name.endswith("_p_mridul"):
        return "mridul"
    return "satyam"


def normalize_tts_language(language: str | None) -> str:
    if not language or language == "unknown":
        return DEFAULT_TTS_LANGUAGE
    return language if language in SUPPORTED_TTS_LANGUAGES else DEFAULT_TTS_LANGUAGE


def get_current_epoch():
    """Get the current epoch time."""
    return int(time.time())


class VoiceAgent(Agent):
    """Voice agent that listens to the user and responds with text."""

    def __init__(self, job_context: JobContext, profile: str = "satyam") -> None:
        self.job_context = job_context
        self.system_prompt, self.intro_instructions = get_voice_prompt(profile)
        self._tts_language = DEFAULT_TTS_LANGUAGE

        llm = openai.LLM(
            model="gpt-4o",
            temperature=float("0.7"),
            api_key=OPENAI_KEY,
        )
        stt = sarvam.STT(
            model="saaras:v3",
            language="unknown",
            mode="transcribe",
            flush_signal=True,
            api_key=SARVAM_API_KEY,
        )
        tts = sarvam.TTS(
            model="bulbul:v3",
            target_language_code=DEFAULT_TTS_LANGUAGE,
            speaker="shubh",
            api_key=SARVAM_API_KEY,
        )
        self._sarvam_tts = tts

        super().__init__(
            instructions=self.system_prompt,
            stt=stt,
            llm=llm,
            tts=tts,
        )

    def _sync_tts_language(self, language: str | None) -> None:
        normalized = normalize_tts_language(str(language) if language else None)
        if normalized == self._tts_language:
            return
        self._tts_language = normalized
        self._sarvam_tts.update_options(target_language_code=normalized)

    async def on_enter(self):
        @self.session.on("user_input_transcribed")
        def on_user_transcript(event):
            if event.is_final and event.language:
                self._sync_tts_language(str(event.language))

        self.session.generate_reply(
            instructions=self.intro_instructions,
            allow_interruptions=True,
        )


async def entrypoint(ctx: JobContext):
    """Entrypoint for the voice agent."""
    await ctx.connect()
    profile = profile_from_room(ctx.room.name)
    messages = []
    session = AgentSession(
        turn_detection="stt",
        min_endpointing_delay=0.07,
    )

    await session.start(agent=VoiceAgent(ctx, profile=profile), room=ctx.room)

    @session.on("conversation_item_added")
    def on_transcript(event):
        print("TRANSCRIPT EVENT:", event.item.role, event.item.content)
        messages.append(
            {"role": event.item.role, "content": event.item.content}
        )

    def end_call():
        session.aclose()

    ctx.room.on("participant_disconnected", end_call)


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
        )
    )
