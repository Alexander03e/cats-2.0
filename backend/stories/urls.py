from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SuccessStoryViewSet

router = DefaultRouter()
router.register(r'', SuccessStoryViewSet, basename='success-story')
