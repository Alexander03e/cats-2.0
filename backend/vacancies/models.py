from django.db import models


class Vacancy(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Открыта'),
        ('CLOSED', 'Закрыта'),
    ]

    image = models.ImageField(
        "Обложка",
        upload_to='vacancy_images/',
        blank=True,
        null=True
    )
    title = models.CharField("Название", max_length=200)
    description = models.TextField("Описание")
    status = models.CharField("Статус", max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Вакансия"
        verbose_name_plural = "Вакансии"

    def __str__(self):
        return self.title


class Application(models.Model):
    TYPE_CHOICES = [
        ('VOLUNTEER', 'Волонтер'),
        ('EMPLOYEE', 'Сотрудник'),
    ]
    STATUS_CHOICES = [
        ('REVIEW', 'На рассмотрении'),
        ('APPROVED', 'Одобрена'),
        ('REJECTED', 'Отклонена'),
    ]

    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name='applications')
    type = models.CharField("Тип заявки", max_length=20, choices=TYPE_CHOICES)
    applicant_name = models.CharField("Имя заявителя", max_length=100)
    status = models.CharField("Статус", max_length=20, choices=STATUS_CHOICES, default='REVIEW')
    phone = models.CharField("Телефон", max_length=20)
    date = models.DateTimeField("Дата подачи", auto_now_add=True)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return f"Заявка {self.id} на {self.vacancy.title}"
