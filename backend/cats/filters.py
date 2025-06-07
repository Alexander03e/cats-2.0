import django_filters
from django.db.models import Q
from .models import Cat


class CatFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    gender = django_filters.CharFilter(method='filter_by_gender')
    health_status = django_filters.CharFilter(method='filter_by_health_status')
    coat_type = django_filters.CharFilter(method='filter_by_coat_type')
    color = django_filters.CharFilter(method='filter_by_colors')  # Custom filter method

    class Meta:
        model = Cat
        fields = []

    def filter_by_colors(self, queryset, name, value):
        colors = value.split(',')
        query = Q()
        for color in colors:
            query |= Q(color__icontains=color.strip())
        return queryset.filter(query)

    def filter_by_gender(self, queryset, name, value):
        genders = value.split(',')
        return queryset.filter(**{f"{name}__in": [gender.strip() for gender in genders]})

    def filter_by_health_status(self, queryset, name, value):
        statuses = value.split(',')
        return queryset.filter(**{f"{name}__in": [status.strip() for status in statuses]})

    def filter_by_coat_type(self, queryset, name, value):
        coat_types = value.split(',')
        return queryset.filter(**{f"{name}__in": [coat_type.strip() for coat_type in coat_types]})
