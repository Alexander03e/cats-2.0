from django.contrib import admin
from django.utils.html import mark_safe
from .models import SuccessStory, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    readonly_fields = ('content_preview',)
    list_filter = ('category',)
    search_fields = ('title', 'description')
    fieldsets = (
        (None, {
            'fields': ('title', 'category', 'photo', 'description')
        }),
        ('Контент', {
            'fields': ('content', 'content_preview'),
            'classes': ('wide',)
        }),
    )
    raw_id_fields=('category',)
    
    def content_preview(self, obj):
        return mark_safe(obj.content)
    content_preview.short_description = "Предпросмотр контента"
