# Generated by Django 5.1.1 on 2024-10-04 15:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('release_date', models.DateField()),
                ('duration', models.IntegerField()),
                ('price_per_seat', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seats', models.JSONField()),
                ('total_cost', models.DecimalField(decimal_places=2, max_digits=8)),
                ('confirmation_number', models.CharField(max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=10)),
                ('is_available', models.BooleanField(default=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
            ],
        ),
    ]
