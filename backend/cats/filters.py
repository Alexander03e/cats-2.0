import django_filters
from .models import Cat

class CatFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    gender = django_filters.MultipleChoiceFilter(choices=Cat.GENDER_CHOICES)
    color = django_filters.MultipleChoiceFilter()
    health_status = django_filters.MultipleChoiceFilter(choices=Cat.HEALTH_STATUS_CHOICES)
    coat_type = django_filters.MultipleChoiceFilter(choices=Cat.COAT_TYPE_CHOICES)

    class Meta:
        model = Cat
        fields = []
        