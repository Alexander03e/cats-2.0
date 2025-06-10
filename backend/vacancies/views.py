from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vacancy, Application
from .serializers import VacancySerializer, ApplicationSerializer

from django.core.mail import send_mail

EMAIL_HOST_USER = 'krisanon24082017@gmail.com'


# EMAIL_HOST_USER = 'alexander034e@gmail.com'


class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all().order_by('-created_at')
    serializer_class = VacancySerializer

    @action(detail=True, methods=['post'], url_path="apply", serializer_class=ApplicationSerializer)
    def apply(self, request, pk=None):
        vacancy = self.get_object()
        # Добавляем vacancy в данные запроса перед валидацией
        request.data.update({'vacancy': vacancy.id})
        serializer = ApplicationSerializer(data=request.data)

        if serializer.is_valid():
            application = serializer.save()

            try:
                # Отправка email с информацией о заявке
                send_mail(
                    subject=f'Новая заявка на вакансию: {vacancy.title}',
                    message=(
                        f'Вакансия: {vacancy.title}\n'
                        f'Имя кандидата: {application.applicant_name}\n'
                        f'Телефон: {application.phone}\n'
                        f'Тип кандидата: {application.get_type_display()}\n'
                    ),
                    from_email=EMAIL_HOST_USER,
                    recipient_list=[EMAIL_HOST_USER],
                    fail_silently=False,
                )
            except Exception as e:
                # Логируем ошибку отправки email, но не прерываем выполнение
                print(f"Ошибка отправки email: {e}")

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(vacancy=self.kwargs.get('vacancy_pk'))

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None, vacancy_pk=None):
        application = self.get_object()
        new_status = request.data.get('status')

        if new_status in dict(Application.STATUS_CHOICES):
            application.status = new_status
            application.save()
            return Response({'status': 'Статус обновлен'})
        return Response({'error': 'Недопустимый статус'}, status=400)
