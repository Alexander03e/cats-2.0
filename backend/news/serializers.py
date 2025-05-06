from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):   
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ['id', 'title', 'description', 'content', 'date', 'cover_image', 'cover_image_url']
        read_only_fields = ('date', 'id')
        
    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None
  