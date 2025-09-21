from django.urls import path
from .views import BlogDetail, ChatWithAI, get_livekit_token, BlogList, ContactCreate, DailyUpdateList, DailyUpdateDetail
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("chat/", ChatWithAI.as_view(), name="chat-with-ai"),
    path("voicebot/", get_livekit_token),
    path("blog/", BlogList.as_view(), name="blog-list"),
    path("blog/<int:pk>/", BlogDetail.as_view(), name="blog-detail"),
    path("contact/", ContactCreate.as_view(), name="contact"),
    path("dailyupdates/", DailyUpdateList.as_view(), name="dailyupdate-list"),
    path("dailyupdates/<int:pk>/", DailyUpdateDetail.as_view(), name="dailyupdate-detail"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
