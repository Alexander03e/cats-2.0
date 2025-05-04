from django.db import models

# Create your models here.
from django.db import models

class Cat(models.Model):
    GENDER_CHOICES = [
      ('MALE', 'Мальчик'), 
      ('FEMALE', 'Девочка')
    ]
    HEALTH_STATUS_CHOICES = [
        ('HEALTHY', 'Здоров(а)'),
        ('SICK', 'Болеет'),
        ('RECOVERING', 'Лечится'),
    ]
    STATUS_CHOICES = [
        ('AVAILABLE', 'Доступен(а)'),
        ('RESERVED', 'Зарезервирован(а)'),
        ('ADOPTED', 'Усыновлен(а)'),
        ('QUARANTINE', 'На карантине'),
        ('UNAVAILABLE', 'Не доступен(а)'),
    ]

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    health_status = models.CharField(max_length=10, choices=HEALTH_STATUS_CHOICES, default='HEALTH')
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    diagnosis = models.TextField(blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='QUARANTINE')
    description = models.TextField()
    photo = models.ImageField(upload_to='cats_photos/', blank=True, null=True)
    
    class Meta:
        verbose_name = "Кошачья особь"
        verbose_name_plural = "Кошачьи особи"

    def __str__(self):
        return self.name