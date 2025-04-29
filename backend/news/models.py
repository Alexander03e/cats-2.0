from django.db import models

class News(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    content = models.TextField("Содержание (HTML)")  # Хранит готовую HTML-разметку
    date = models.DateTimeField("Дата публикации", auto_now_add=True)

    def __str__(self):
        return self.title
