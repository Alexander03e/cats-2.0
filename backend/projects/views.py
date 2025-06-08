from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .models import Project, Donation
from .serializers import ProjectSerializer, DonationSerializer
from rest_framework.response import Response
import json
from django.http import HttpResponse
from yookassa import Configuration, Payment
from yookassa.domain.notification import WebhookNotificationEventType, WebhookNotificationFactory
from yookassa.domain.common import SecurityHelper


def yookassa_webhook_handler(request):
    # Verify the request IP
    ip = request.META.get('REMOTE_ADDR')
    if not SecurityHelper().is_ip_trusted(ip):
        return HttpResponse(status=400)

    event_json = json.loads(request.body)
    try:
        notification_object = WebhookNotificationFactory().create(event_json)
        response_object = notification_object.object

        if notification_object.event == WebhookNotificationEventType.PAYMENT_SUCCEEDED:
            metadata = response_object.metadata
            project_id = metadata.get('project_id')
            donation_id = metadata.get('donation_id')
            amount = response_object.amount.value

            # Update project amount
            project = Project.objects.get(id=project_id)
            project.current_amount += float(amount)
            project.save()

            # Update donation status
            donation = Donation.objects.get(id=donation_id)
            donation.status = 'SUCCESS'
            donation.save()

        elif notification_object.event == WebhookNotificationEventType.PAYMENT_CANCELED:
            metadata = response_object.metadata
            donation_id = metadata.get('donation_id')

            # Update donation status
            donation = Donation.objects.get(id=donation_id)
            donation.status = 'FAILED'
            donation.save()

        elif notification_object.event == WebhookNotificationEventType.PAYMENT_WAITING_FOR_CAPTURE:
            # Handle waiting for capture logic if needed
            pass

    except Exception as e:
        # Log the error and return a failure response
        return HttpResponse(status=400)

    return HttpResponse(status=200)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=['post'], serializer_class=DonationSerializer, url_path='donate')
    def donate(self, request, pk=None):
        project = self.get_object()
        serializer = DonationSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            donation = serializer.save(project=project)

            # Create payment in YooKassa
            payment = Payment.create({
                "amount": {
                    "value": str(donation.amount),
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": "https://localhost:3000/"
                },
                "description": f"Donation for project: {project.title}",
                "metadata": {
                    "donation_id": donation.id,
                    "project_id": project.id
                }
            })

            confirmation_url = payment.confirmation.confirmation_url
            return Response({"confirmation_url": confirmation_url}, status=201)
        return Response(serializer.errors, status=400)


class DonationViewSet(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Donation.objects.filter(project_id=self.kwargs.get('project_pk'))
