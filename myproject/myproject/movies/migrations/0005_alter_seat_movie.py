# Generated by Django 5.0.6 on 2024-10-06 10:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_movie_price_per_seat_alter_movie_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seat',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seats', to='movies.movie'),
        ),
    ]