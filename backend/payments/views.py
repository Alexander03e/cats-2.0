from django.http import HttpResponse
from yookassa.domain.notification import WebhookNotificationEventType, WebhookNotificationFactory
from projects.models import Project, Donation
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def yookassa_webhook_handler(request):
    # # Verify the request IP
    # ip = request.META.get('REMOTE_ADDR')
    # if not SecurityHelper().is_ip_trusted(ip):
    #     return HttpResponse(status=400)
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
