from django.contrib import admin
from .models import Task, Team

class TaskAdmin(admin.ModelAdmin):
    readonly_fields=('id',)


class TeamAdmin(admin.ModelAdmin):
    readonly_fields=('id',)

# Register your models here.
admin.site.register(Team,TeamAdmin)
admin.site.register(Task,TaskAdmin)
