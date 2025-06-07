from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SystemViewSet

router = DefaultRouter()
router.register(r'system', SystemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
