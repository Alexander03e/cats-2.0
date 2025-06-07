from django.db import models


class System(models.Model):
    address = models.TextField("Адрес", blank=True, null=True)
    phone_number = models.CharField("Номер телефона", max_length=15, blank=True)
    email = models.EmailField("Email", blank=True, null=True)
    vk_link = models.URLField("Ссылка на VK", blank=True, null=True)
    telegram_link = models.URLField("Ссылка на Telegram", blank=True, null=True)
    instagram_link = models.URLField("Ссылка на Instagram", blank=True, null=True)
    whatsapp_link = models.URLField("Ссылка на Whatsapp", blank=True, null=True)
    calendar_info = models.TextField('Дни работы и часы', blank=True, null=True)
    short_calendar_info = models.TextField('Краткая информация о днях работы', blank=True, null=True)

    class Meta:
        verbose_name = "Информация"
        verbose_name_plural = "Информация"

    def __str__(self):
        return "Информация о системе"
