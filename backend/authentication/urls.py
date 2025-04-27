from rest_framework.routers import SimpleRouter
from .views import (
    UserViewSet,
    AuthViewSet
)

router = SimpleRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'', AuthViewSet, basename='auth')
