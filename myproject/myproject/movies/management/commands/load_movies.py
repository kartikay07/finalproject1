import os
from django.core.management.base import BaseCommand
import json
from movies.models import Movie  # Adjust this import based on your actual model

class Command(BaseCommand):
    help = 'Load movies from a JSON file'

    def handle(self, *args, **kwargs):
        # Get the path to the movies.json file
        json_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'movies.json')

        # Debugging line to check the path
        print(f"Loading movies from: {json_file_path}")

        try:
            with open(json_file_path, 'r') as file:
                movies_data = json.load(file)
                for movie in movies_data:
                    # Create Movie objects (adjust fields according to your model)
                    Movie.objects.create(
                        title=movie['title'],
                        description=movie['description'],
                        duration=movie['duration'],
                        rating=movie['rating'],
                        genre=movie['genre'],
                        poster_url=movie['poster_url'],
                    )
            self.stdout.write(self.style.SUCCESS('Movies loaded successfully!'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {json_file_path}'))
