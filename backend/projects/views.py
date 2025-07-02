from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .models import Project, Donation
from .serializers import ProjectSerializer, DonationSerializer
from rest_framework.response import Response
import json
from yookassa import Configuration, Payment
from rest_framework.views import APIView
from rest_framework import status


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=['post'], serializer_class=DonationSerializer, url_path='donate')
    def donate(self, request, pk=None):
        project = self.get_object()
        serializer = DonationSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            donation = serializer.save(project=project)
            redirect_url = request.data.get('redirectUrl', 'https://котодом-самара.рф')

            # Create payment in YooKassa
            payment = Payment.create({
                "amount": {
                    "value": str(donation.amount),
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": redirect_url
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



class MoneySupportView(APIView):
    def post(self, request):
        name = request.data.get('name')
        amount = request.data.get('amount')
        message = request.data.get('message', '')
        redirect_url = request.data.get('redirectUrl', 'https://котодом-самара.рф')

        if not name or not amount:
            return Response(
                {"error": "Name and amount are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create payment in YooKassa
            payment = Payment.create({
                "amount": {
                    "value": str(amount),
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": redirect_url
                },
                "description": f"Support donation from {name}: {message}"
            })

            confirmation_url = payment.confirmation.confirmation_url
            return Response({"confirmation_url": confirmation_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
