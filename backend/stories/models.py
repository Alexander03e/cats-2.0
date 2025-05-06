from django.db import models

class Category(models.Model):
    name = models.CharField("Название категории", max_length=50, unique=True)
    slug = models.SlugField("Slug", max_length=50, unique=True)
    
    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
    
    def __str__(self):
        return self.name

class SuccessStory(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    photo = models.ImageField("Фото", upload_to='success_stories/')
    content = models.TextField("Содержание (HTML)", blank=True)  # Хранит готовую HTML-разметку
    description = models.TextField("Описание")
    date = models.DateTimeField("Дата публикации", auto_now_add=True)
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name = "История успеха"
        verbose_name_plural = "Истории успеха"

    def __str__(self):
        return self.title
  