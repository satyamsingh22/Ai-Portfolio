

from rest_framework import serializers
from .models import Blog, Contact,DailyUpdate
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        


class DailyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyUpdate
        fields = "__all__"