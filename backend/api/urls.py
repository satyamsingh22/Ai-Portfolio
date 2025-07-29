from django.urls import path
from .views import ChatWithAI

urlpatterns = [
    path('chat/', ChatWithAI.as_view(), name='chat-with-ai'),
]
