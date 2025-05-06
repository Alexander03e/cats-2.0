from rest_framework import viewsets
from .models import SuccessStory
from .serializers import SuccessStorySerializer
from django_filters.rest_framework import DjangoFilterBackend

class SuccessStoryViewSet(viewsets.ModelViewSet):
    queryset = SuccessStory.objects.all().order_by('-date')
    serializer_class = SuccessStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug']

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        return queryset.select_related('category')