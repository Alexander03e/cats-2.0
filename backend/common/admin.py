from django.contrib import admin
from django.utils.html import format_html
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'image_preview', 'image_link')
    readonly_fields = ('image_preview', 'image_link')
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px;"/>',
                obj.image.url
            )
        return "-"
    image_preview.short_description = "Превью"

    def image_link(self, obj):
        if obj.image:
            return format_html(
                '<a href="{}" target="_blank">{}</a>',
                obj.image.url,
                obj.image.url
            )
        return "-"
    image_link.short_description = "Ссылка на файл"
    