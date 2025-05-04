from django.db import models

class Project(models.Model):
    STATUS_CHOICES = [
        ('SOON', 'Планируется'),
        ('ACTIVE', 'Собирает средства'),
        ('END', 'Завершен'),
    ]
    
    title = models.CharField("Название", max_length=200)
    description = models.TextField("Описание")
    goal_amount = models.DecimalField("Целевая сумма", max_digits=12, decimal_places=2)
    current_amount = models.DecimalField("Собрано", max_digits=12, decimal_places=2, default=0)
    status = models.CharField("Статус", max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    
    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return self.title

class Donation(models.Model):
    project = models.ForeignKey(Project, verbose_name="Проект", on_delete=models.CASCADE, related_name='donations')
    amount = models.DecimalField("Сумма", max_digits=12, decimal_places=2)
    donor_name = models.CharField("Имя донора", max_length=100)
    message = models.TextField("Сообщение", blank=True)
    date = models.DateTimeField("Дата", auto_now_add=True)
    
    class Meta:
        verbose_name = "Донат"
        verbose_name_plural = "Донаты"

    def __str__(self):
        return f"Донат {self.amount} от {self.donor_name}"
