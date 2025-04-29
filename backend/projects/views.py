from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project, Donation
from .serializers import ProjectSerializer, DonationSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def donate(self, request, pk=None):
        project = self.get_object()
        serializer = DonationSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            donation = serializer.save(project=project)
            project.current_amount += donation.amount
            project.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DonationViewSet(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return Donation.objects.filter(project_id=self.kwargs.get('project_pk'))
