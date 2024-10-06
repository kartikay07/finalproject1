from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# movies/models.py
from django.db import models

class Movie(models.Model):
    GENRE_CHOICES = [
        ('action', 'Action'),
        ('comedy', 'Comedy'),
        ('drama', 'Drama'),
        ('horror', 'Horror'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(max_length=2000)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES, default='action')  # Add default here
    language = models.CharField(max_length=20, choices=[('english', 'English'), ('spanish', 'Spanish'), ('hindi', 'Hindi')], default='english')
    rating = models.CharField(max_length=5, choices=[('G', 'G'), ('PG', 'PG'), ('PG-13', 'PG-13'), ('R', 'R')], default='G')
    poster_url = models.URLField(blank=True, null=True)
    release_date = models.DateField(default=timezone.now)
    duration = models.IntegerField(null=True)
    price_per_seat = models.DecimalField(max_digits=6, decimal_places=2 ,default=0)
class Seat(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE,related_name='seats')
    number = models.CharField(max_length=10)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.number} - {self.movie.title}'

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    seats = models.JSONField()  # List of seat numbers
    total_cost = models.DecimalField(max_digits=8, decimal_places=2)
    confirmation_number = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.user.username} - {self.movie.title} - {self.confirmation_number}'
    
class MyUserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
