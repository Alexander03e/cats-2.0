from django.urls import path
from .views import yookassa_webhook_handler

urlpatterns = [
    path('accept-payment/', yookassa_webhook_handler, name='yookassa-webhook'),
]
