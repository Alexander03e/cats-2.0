from rest_framework import serializers
from .models import Cat, CatPhoto, CatAttribute

class CatAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatAttribute
        fields = ('id', 'name')

class CatSerializer(serializers.ModelSerializer):
    photos = serializers.SerializerMethodField()
    attributes = serializers.SerializerMethodField()
    
    class Meta:
        model = Cat
        fields = '__all__'
    
    def get_photos(self, obj):
        return [photo.photo.url for photo in obj.photos.all()]
    
    def get_attributes(self, obj):
        return [attribute.name for attribute in obj.attributes.all()]
        