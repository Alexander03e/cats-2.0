from django.contrib import admin
from .models import Cat, CatPhoto, CatAttribute, AdoptionApplication


class CatPhotoInline(admin.TabularInline):
    model = CatPhoto
    extra = 1
    
class CatAttributeInline(admin.TabularInline):
    model = Cat.attributes.through
    extra = 1

@admin.register(Cat)
class CatAdmin(admin.ModelAdmin):
    inlines = [CatPhotoInline, CatAttributeInline]
    filter_horizontal = ('attributes',)
    
@admin.register(CatAttribute)
class CatAttributeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(AdoptionApplication)
class AdoptionApplicationAdmin(admin.ModelAdmin):
    list_display = ('cat', 'full_name', 'phone', 'status', 'created_at')
    list_filter = ('status', 'cat')
    search_fields = ('first_name', 'last_name', 'phone', 'email')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        (None, {
            'fields': ('cat', 'status')
        }),
        ('Данные заявителя', {
            'fields': (
                ('first_name', 'last_name'),
                'phone',
                'email',
            )
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def full_name(self, obj):
        return f"{obj.last_name} {obj.first_name}"
    full_name.short_description = "ФИО"