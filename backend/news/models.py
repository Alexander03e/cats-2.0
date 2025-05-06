from django.db import models

class News(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    content = models.TextField("Содержание (HTML)")  # Хранит готовую HTML-разметку
    date = models.DateTimeField("Дата публикации", auto_now_add=True)
    cover_image = models.ImageField(
        "Обложка", 
        upload_to='news_covers/',
        blank=True,
        null=True
    )
    description = models.CharField("Краткое описание", max_length=255, blank=True)
    
    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title
