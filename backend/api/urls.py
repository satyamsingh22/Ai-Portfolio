from django.urls import path
from .views import BlogDetail, ChatWithAI,get_livekit_token,BlogList
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('chat/', ChatWithAI.as_view(), name='chat-with-ai'),
    path('voicebot/', get_livekit_token),
    path('blog/', BlogList.as_view(), name='blog-list'),
    path('blog/<int:pk>/', BlogDetail.as_view(), name='blog-detail'),  # <-- Add this line

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)