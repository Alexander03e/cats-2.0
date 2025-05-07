# admin.py
from django import forms
from django.contrib import admin
from .models import Project, Donation

class ProjectForm(forms.ModelForm):
    spending_items = forms.CharField(
        widget=forms.Textarea,
        required=False,
        help_text="Введите каждый пункт расхода с новой строки"
    )

    class Meta:
        model = Project
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:
            self.initial['spending_items'] = '\n'.join(self.instance.get_spending_list())

    def save(self, commit=True):
        instance = super().save(commit=False)
        items = self.cleaned_data['spending_items'].split('\n')
        instance.set_spending_list([item.strip() for item in items if item.strip()])
        if commit:
            instance.save()
        return instance

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectForm
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'cover_image')
        }),
        ('Финансы', {
            'fields': ('for_what', 'goal_amount', 'current_amount', 'status')
        }),
        ('Детали расходов', {
            'fields': ('spending_items',),
            'classes': ('wide',)
        }),
    )
    
admin.site.register(Donation)
