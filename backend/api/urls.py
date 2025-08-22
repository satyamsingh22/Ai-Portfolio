from django.urls import path
from .views import ChatWithAI,get_livekit_token

urlpatterns = [
    path('chat/', ChatWithAI.as_view(), name='chat-with-ai'),
    path('voicebot/', get_livekit_token)
]
