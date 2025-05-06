from django.db import models

class CatAttribute(models.Model):
    name = models.CharField(
        "Название атрибута", 
        max_length=100,
        unique=True,
        help_text="Например: 'Знает лоточек', 'Вакцинирован'"
    )
    
    class Meta:
        verbose_name = "Атрибут кошки"
        verbose_name_plural = "Атрибуты кошек"
        ordering = ['name']

    def __str__(self):
        return self.name


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
    
    COAT_TYPE_CHOICES = [
        ('SHORT', 'Гладкошерстный'),
        ('LONG', 'Пушистый'),
    ]

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    health_status = models.CharField(max_length=10, choices=HEALTH_STATUS_CHOICES, default='HEALTHY')
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    diagnosis = models.TextField(blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='QUARANTINE')
    description = models.TextField()
    left_at = models.DateField(verbose_name="Дата выбывания", null=True, blank=True)
    coat_type = models.CharField(
        "Тип шерсти",
        max_length=5,
        choices=COAT_TYPE_CHOICES,
        blank=True,
        null=True
    )
    attributes = models.ManyToManyField(
        CatAttribute,
        verbose_name="Атрибуты",
        blank=True,
        related_name='cats'
    )
    
    class Meta:
        verbose_name = "Кошачья особь"
        verbose_name_plural = "Кошачьи особи"

    def __str__(self):
        return self.name
    
    
class CatPhoto(models.Model):
    cat = models.ForeignKey(
        Cat, 
        on_delete=models.CASCADE,
        related_name='photos'
    )
    photo = models.ImageField(
        upload_to='cats_photos/',
        verbose_name='Фотография'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )

    class Meta:
        verbose_name = "Фотография кошки"
        verbose_name_plural = "Фотографии кошек"
        ordering = ['-created_at']

    def __str__(self):
        return f"Фото {self.id} для {self.cat.name}"
    
    
from django.db import models
from django.core.validators import RegexValidator

class AdoptionApplication(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'Новая'),
        ('IN_REVIEW', 'В обработке'),
        ('APPROVED', 'Одобрена'),
        ('REJECTED', 'Отклонена'),
    ]

    cat = models.ForeignKey(
        Cat,
        on_delete=models.CASCADE,
        verbose_name="Кошка",
        related_name='applications'
    )
    first_name = models.CharField("Имя", max_length=50)
    last_name = models.CharField("Фамилия", max_length=50)
    
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Телефон должен быть в формате: '+79999999999'"
    )
    phone = models.CharField(
        "Телефон",
        validators=[phone_regex],
        max_length=17
    )
    
    email = models.EmailField("Email")
    consent = models.BooleanField(
        "Согласие на обработку данных",
        default=False
    )
    status = models.CharField(
        "Статус заявки",
        max_length=10,
        choices=STATUS_CHOICES,
        default='NEW'
    )
    created_at = models.DateTimeField(
        "Дата создания",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Заявка на усыновление"
        verbose_name_plural = "Заявки на усыновление"
        ordering = ['-created_at']

    def __str__(self):
        return f"Заявка #{self.id} на {self.cat.name}"