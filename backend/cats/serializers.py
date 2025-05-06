from rest_framework import serializers
from .models import Cat, AdoptionApplication, CatAttribute

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
        
        
class AdoptionApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionApplication
        fields = ['first_name', 'last_name', 'phone', 'email', 'consent']
        extra_kwargs = {
            'cat': {'read_only': True},
            'status': {'read_only': True}
        }
        
    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError("Необходимо дать согласие на обработку данных")
        return value