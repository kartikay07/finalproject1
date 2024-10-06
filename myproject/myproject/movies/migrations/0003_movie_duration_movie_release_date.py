# Generated by Django 5.0.6 on 2024-10-05 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_myuser_remove_movie_duration_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='duration',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='movie',
            name='release_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
