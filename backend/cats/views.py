from rest_framework import viewsets
from rest_framework.response import Response
from .models import Cat
from .filters import CatFilter
from .serializers import CatSerializer
import django_filters

class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = CatFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        # Получаем уникальные цвета из базы данных
        colors = Cat.objects.order_by('color').values_list('color', flat=True).distinct()
        
        # Формируем объект фильтров
        filters = {
            'gender': dict(Cat.GENDER_CHOICES),
            'coat_type': dict(Cat.COAT_TYPE_CHOICES),
            'health_status': dict(Cat.HEALTH_STATUS_CHOICES),
            'color': {color: color for color in colors if color},
        }
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'results': serializer.data,
                'filters': filters
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'results': serializer.data,
            'filters': filters
        })
        