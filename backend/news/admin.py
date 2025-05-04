from django.contrib import admin
from django.utils.html import mark_safe
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'cover_image_preview')
    readonly_fields = ('cover_image_preview', 'content_preview')
    fieldsets = (
        (None, {
            'fields': ('title', 'cover_image', 'cover_image_preview')
        }),
        ('Контент', {
            'fields': ('content', 'content_preview'),
            'classes': ('wide',)
        }),
    )
    
    def cover_image_preview(self, obj):
      if obj.cover_image and obj.cover_image.url:
          return mark_safe(f'<img src="{obj.cover_image.url}" width="150" />')
      return "-"
    cover_image_preview.short_description = "Превью обложки"

    def content_preview(self, obj):
        return mark_safe(obj.content)
    content_preview.short_description = "Предпросмотр контента"
