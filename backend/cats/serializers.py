from rest_framework import serializers
from .models import Cat, AdoptionApplication, CatAttribute, CatPhoto


class CatAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatAttribute
        # fields = ('id', 'name')
        fields = '__all__'


class CatSerializer(serializers.ModelSerializer):
    photos = serializers.SerializerMethodField()
    attributes = CatAttributeSerializer(many=True, read_only=True)
    attribute_ids = serializers.PrimaryKeyRelatedField(
        source='attributes',
        many=True,
        queryset=CatAttribute.objects.all(),
        write_only=True
    )

    class Meta:
        model = Cat
        fields = [
            'id',
            'name',
            'breed',
            'color',
            'age',
            'health_status',
            'gender',
            'diagnosis',
            'status',
            'description',
            'left_at',
            'coat_type',
            'attribute_ids',
            'attributes',
            'photos'
        ]

    def get_photos(self, obj):
        return [photo.photo.url for photo in obj.photos.all()]

    def get_attributes(self, obj):
        return [attribute.name for attribute in obj.attributes.all()]

    def create(self, validated_data):
        attributes = validated_data.pop('attributes', [])
        cat = Cat.objects.create(**validated_data)
        cat.attributes.set(attributes)
        return cat

    def update(self, instance, validated_data):
        attributes = validated_data.pop('attributes', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle attributes
        instance.attributes.set(attributes)

        # Handle photos if they exist in the request
        if 'photos' in self.context.get('request', {}).FILES:
            images_data = self.context['request'].FILES.getlist('photos')
            # Delete all existing images (optional - you might want to keep them)
            instance.photos.all().delete()
            for image_data in images_data:
                CatPhoto.objects.create(cat=instance, photo=image_data)  # Note: 'cat' not 'cats'

        return instance


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
