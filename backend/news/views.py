from rest_framework import viewsets, permissions
from .models import News
from .serializers import NewsSerializer

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAdminUser]  # Только админы могут изменять
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]  # Все могут читать
        return super().get_permissions()

    def get_serializer_context(self):
        return {'request': self.request}
  