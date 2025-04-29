from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VacancyViewSet, ApplicationViewSet

router = DefaultRouter()
router.register(r'', VacancyViewSet)

vacancy_router = DefaultRouter()
vacancy_router.register(r'applications', ApplicationViewSet, basename='vacancy-applications')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:vacancy_pk>/', include(vacancy_router.urls)),
]
