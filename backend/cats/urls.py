from rest_framework.routers import DefaultRouter
from .views import CatViewSet, CatAttributeViewSet
from .views import ApplicationsViewSet
from django.urls import include, path

cats_router = DefaultRouter()
cats_router.register(r'applications', ApplicationsViewSet, basename='cat-applications')

router = DefaultRouter()
router.register(r'attributes', CatAttributeViewSet, basename='cat-attributes')
router.register(r'', CatViewSet, basename='cats')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:cat_pk>/', include(cats_router.urls)),
]
