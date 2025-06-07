import django_filters
from django.db.models import Q
from .models import Cat


class CatFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    gender = django_filters.MultipleChoiceFilter(choices=Cat.GENDER_CHOICES)
    color = django_filters.CharFilter(method='filter_by_colors')  # Custom filter method
    health_status = django_filters.MultipleChoiceFilter(choices=Cat.HEALTH_STATUS_CHOICES)
    coat_type = django_filters.MultipleChoiceFilter(choices=Cat.COAT_TYPE_CHOICES)

    class Meta:
        model = Cat
        fields = []

    def filter_by_colors(self, queryset, name, value):
        colors = value.split(',')
        query = Q()
        for color in colors:
            query |= Q(color__icontains=color.strip())
        return queryset.filter(query)
