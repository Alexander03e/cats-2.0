from rest_framework import viewsets, permissions
from .models import News
from .serializers import NewsSerializer, NewsListSerializer, NewsDetailSerializer


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_serializer_class(self):
        if self.action == 'list':
            return NewsListSerializer
        elif self.action == 'retrieve':
            return NewsDetailSerializer
        return NewsSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]  # Все могут читать
        return super().get_permissions()

    def get_serializer_context(self):
        return {'request': self.request}
