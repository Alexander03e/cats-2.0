from rest_framework import serializers
from .models import News, NewsImage


class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ['image']


class NewsSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    images = NewsImageSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = ['id', 'title', 'description', 'content', 'date', 'cover_image', 'cover_image_url', 'images']
        read_only_fields = ('date', 'id')

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        news = News.objects.create(**validated_data)

        for image_data in images_data:
            NewsImage.objects.create(news=news, image=image_data)

        return news

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Get all existing images
        existing_images = instance.images.all()
        # Delete all existing images
        existing_images.delete()

        # Add new images from the request
        images_data = self.context['request'].FILES.getlist('images')
        for image_data in images_data:
            NewsImage.objects.create(news=instance, image=image_data)

        return instance


class NewsListSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ['id', 'title', 'description', 'date', 'cover_image_url', 'content']

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None


class NewsDetailSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ['id', 'title', 'description', 'content', 'date', 'cover_image_url', 'images']

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None

    def get_images(self, obj):
        return [
            self.context['request'].build_absolute_uri(image.image.url)
            for image in obj.images.all()
        ]
