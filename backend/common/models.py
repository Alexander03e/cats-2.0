from django.db import models

class Photo(models.Model):
    title = models.CharField("Название", max_length=200, blank=True)
    image = models.ImageField(
        "Изображение",
        upload_to='photos/%Y/%m/%d/'
    )
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Фотография"
        verbose_name_plural = "Фотографии"
        ordering = ['-created_at']

    def __str__(self):
        return self.title or f"Фото #{self.id}"

    def image_url(self):
        if self.image:
            return self.image.url
        return "-"
    image_url.short_description = "Ссылка на изображение"
