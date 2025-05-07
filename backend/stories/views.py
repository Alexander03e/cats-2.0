from rest_framework import viewsets
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import SuccessStory, Category
from .serializers import SuccessStorySerializer, CategorySerializer
from .filters import SuccessStoryFilter

class SuccessStoryViewSet(viewsets.ModelViewSet):
    queryset = SuccessStory.objects.all().order_by('-date')
    serializer_class = SuccessStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SuccessStoryFilter  

    def list(self, request, *args, **kwargs):
        # Основная логика списка
        queryset = self.filter_queryset(self.get_queryset())
        
        # Пагинация
        page = self.paginate_queryset(queryset)
        
        # Формируем базовую структуру ответа
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response_data = self.get_paginated_response(serializer.data).data
        else:
            serializer = self.get_serializer(queryset, many=True)
            response_data = {
                'results': serializer.data
            }

        # Добавляем категории в ответ
        categories = Category.objects.all()
        category_serializer = CategorySerializer(categories, many=True)
        response_data['categories'] = category_serializer.data

        return Response(response_data)
    