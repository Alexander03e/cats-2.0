from django_filters import rest_framework as filters
from .models import SuccessStory

class SuccessStoryFilter(filters.FilterSet):
    category = filters.CharFilter(field_name='category__slug', lookup_expr='exact')
    
    class Meta:
        model = SuccessStory
        fields = ['category', 'date']
        