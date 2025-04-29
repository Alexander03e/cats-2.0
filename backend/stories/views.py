from rest_framework import viewsets, permissions
from .models import SuccessStory
from .serializers import SuccessStorySerializer

class SuccessStoryViewSet(viewsets.ModelViewSet):
    queryset = SuccessStory.objects.all().order_by('-date')
    serializer_class = SuccessStorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]