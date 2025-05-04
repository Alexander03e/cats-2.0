from django.db import models

class SuccessStory(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    photo = models.ImageField("Фото", upload_to='success_stories/')
    description = models.TextField("Описание")
    date = models.DateTimeField("Дата публикации", auto_now_add=True)
    
    class Meta:
        verbose_name = "История успеха"
        verbose_name_plural = "Истории успеха"

    def __str__(self):
        return self.title
  