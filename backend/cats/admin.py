from django.contrib import admin
from .models import Cat, CatPhoto, CatAttribute


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
