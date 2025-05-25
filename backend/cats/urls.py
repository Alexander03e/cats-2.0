from rest_framework.routers import DefaultRouter
from .views import CatViewSet, CatAttributeViewSet

router = DefaultRouter()
router.register(r'attributes', CatAttributeViewSet, basename='cat-attributes')
router.register(r'', CatViewSet, basename='cats')
