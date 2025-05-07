from rest_framework import serializers
from .models import SuccessStory, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')

class SuccessStorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = SuccessStory
        fields = '__all__'
        read_only_fields = ('date',)
