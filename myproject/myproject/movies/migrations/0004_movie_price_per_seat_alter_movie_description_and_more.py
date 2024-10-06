# Generated by Django 5.1.1 on 2024-10-05 16:04

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_movie_duration_movie_release_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='price_per_seat',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='movie',
            name='description',
            field=models.TextField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='movie',
            name='release_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]