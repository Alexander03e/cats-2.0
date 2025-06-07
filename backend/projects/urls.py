from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, DonationViewSet
from .views import yookassa_webhook_handler

router = DefaultRouter()
router.register(r'', ProjectViewSet)

projects_router = DefaultRouter()
projects_router.register(r'donations', DonationViewSet, basename='project-donations')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:project_pk>/', include(projects_router.urls)),
    path('donation-webhook/', yookassa_webhook_handler, name='yookassa-webhook'),
]
