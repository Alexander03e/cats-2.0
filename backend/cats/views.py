from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Cat, CatPhoto, AdoptionApplication
from .filters import CatFilter
from .serializers import CatSerializer, AdoptionApplicationSerializer
import django_filters
from .models import CatAttribute
from .serializers import CatAttributeSerializer
from django.core.mail import send_mail

EMAIL_HOST_USER = 'krisanon24082017@gmail.com'


class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = CatFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Получаем уникальные цвета из базы данных
        colors = Cat.objects.order_by('color').values_list('color', flat=True).distinct()

        # Формируем объект фильтров
        filters = {
            'gender': dict(Cat.GENDER_CHOICES),
            'coat_type': dict(Cat.COAT_TYPE_CHOICES),
            'health_status': dict(Cat.HEALTH_STATUS_CHOICES),
            'color': {color: color for color in colors if color},
        }

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'results': serializer.data,
                'filters': filters
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'results': serializer.data,
            'filters': filters
        })

    @action(
        methods=['post'],
        detail=True,
        url_path='adopt',
        serializer_class=AdoptionApplicationSerializer,
        permission_classes=[permissions.AllowAny],
    )
    def adopt(self, request, pk=None):
        cat = self.get_object()
        serializer = AdoptionApplicationSerializer(data=request.data)

        if serializer.is_valid():
            # Создаем заявку и привязываем к кошке
            application = serializer.save(cat=cat)
            # Send email notification
            send_mail(
                subject=f'Заявка на кошку: {cat.name}',
                message=(
                    f'Имя: {application.first_name}\n'
                    f'Фамилия: {application.last_name}\n'
                    f'Телефон: {application.phone}\n'
                    f'Email: {application.email}\n'
                ),
                from_email=EMAIL_HOST_USER,
                recipient_list=[EMAIL_HOST_USER],
                fail_silently=False,
            )
            # Обновляем статус кошки
            cat.status = 'RESERVED'
            cat.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatAttributeViewSet(viewsets.ModelViewSet):
    queryset = CatAttribute.objects.all()
    serializer_class = CatAttributeSerializer
    permission_classes = [permissions.AllowAny]


class ApplicationsViewSet(viewsets.ModelViewSet):
    serializer_class = AdoptionApplicationSerializer

    def get_queryset(self):
        return AdoptionApplication.objects.filter(cat=self.kwargs.get('cat_pk'))

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None, cat_pk=None):
        application = self.get_object()
        new_status = request.data.get('status')

        if new_status in dict(AdoptionApplication.STATUS_CHOICES):
            application.status = new_status
            application.save()
            return Response({'status': 'Статус обновлен'})
        return Response({'error': 'Недопустимый статус'}, status=400)
