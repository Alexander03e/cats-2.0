from rest_framework.routers import DefaultRouter
from .views import CatViewSet, CatAttributeViewSet
from .views import ApplicationsViewSet

router = DefaultRouter()
router.register(r'applications', ApplicationsViewSet, basename='cat-applications')
router.register(r'attributes', CatAttributeViewSet, basename='cat-attributes')
router.register(r'', CatViewSet, basename='cats')
