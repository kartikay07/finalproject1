# upload_seats.py

import json
from django.core.management.base import BaseCommand
from movies.models import Seat, Movie

class Command(BaseCommand):
    help = 'Upload seat data from a JSON file'

    def handle(self, *args, **kwargs):
        # Load seat data from JSON file
        with open('C:/Users/Kartikay Pandey/finalexam/myproject/myproject/seats.json', 'r') as file:  # Update the path accordingly
            seats_data = json.load(file)

        # Iterate through the data and create Seat objects
        for seat in seats_data:
            try:
                movie = Movie.objects.get(id=seat['movie_id'])  # Get the associated movie
                Seat.objects.create(
                    movie=movie,
                    number=seat['number'],
                    is_available=seat['is_available']
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully added seat {seat["number"]} for movie {movie.title}'))
            except Movie.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Movie with ID {seat["movie_id"]} does not exist. Skipping seat {seat["number"]}.'))
