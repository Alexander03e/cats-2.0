from rest_framework import serializers
from .models import Project, Donation

class ProjectSerializer(serializers.ModelSerializer):
    spending_list = serializers.SerializerMethodField()
    
    def get_spending_list(self, obj):
        return obj.get_spending_list()
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('current_amount', 'created_at')

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('date',)
  