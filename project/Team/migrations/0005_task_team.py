# Generated by Django 4.1 on 2022-08-21 10:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Team', '0004_task_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='Team',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='Team.team'),
            preserve_default=False,
        ),
    ]
