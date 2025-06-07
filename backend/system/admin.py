from django.contrib import admin
from .models import System


@admin.register(System)
class SystemAdmin(admin.ModelAdmin):
    list_display = ('address', 'phone_number', 'email')
    search_fields = ('address', 'phone_number', 'email')
    list_filter = ('vk_link', 'telegram_link', 'instagram_link', 'whatsapp_link')
    fieldsets = (
        (None, {
            'fields': ('address', 'phone_number', 'email')
        }),
        ('Социальные сети', {
            'fields': ('vk_link', 'telegram_link', 'instagram_link', 'whatsapp_link'),
            'classes': ('wide',)
        }),
        ('Рабочее время', {
            'fields': ('calendar_info', 'short_calendar_info'),
        }),
    )
