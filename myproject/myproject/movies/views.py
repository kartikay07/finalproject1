from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
# Create your views here.
import json
import uuid
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Movie, Seat, Booking
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Movie, Seat
import logging
def movie_list(request):
    genre = request.GET.get('genre')
    language = request.GET.get('language')
    rating = request.GET.get('rating')
    
    movies = Movie.objects.all()

    if genre:
        movies = movies.filter(genre=genre)
    if language:
        movies = movies.filter(language=language)
    if rating:
        movies = movies.filter(rating=rating)
    
    movies_data = [{
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "rating": movie.rating,
        "poster_url": movie.poster_url
    } for movie in movies]

    return JsonResponse(movies_data, safe=False)

def movie_details(request, id):
    movie = get_object_or_404(Movie, id=id)
    movie_data = {
        "title": movie.title,
        "description": movie.description,
        "release_date": movie.release_date,
        "duration": movie.duration,
        "price_per_seat": movie.price_per_seat,
    }
    return JsonResponse(movie_data)
#@login_required
def seat_selection(request, id):
    if request.method == 'GET':
        seats = Seat.objects.filter(movie_id=id)
        seat_data = [{"seatNumber": seat.number, "available": seat.is_available} for seat in seats]
        return JsonResponse(seat_data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        seats = Seat.objects.filter(movie_id=id, number__in=data['seats'])
        seats.update(is_available=False)
        # Calculate total cost
        movie = Movie.objects.get(id=id)
        total_cost = len(seats) * movie.price_per_seat
        confirmation_number = str(uuid.uuid4())
        # Create a booking
        booking = Booking.objects.create(
            user=request.user,
            movie=movie,
            seats=data['seats'],
            total_cost=total_cost,
            confirmation_number=confirmation_number
        )
        return JsonResponse({"message": "Seats booked successfully", "confirmationNumber": confirmation_number})
    
def booking_summary(request, id):
    booking = Booking.objects.get(id=id)
    booking_data = {
        "movieTitle": booking.movie.title,
        "seats": booking.seats,
        "totalCost": booking.total_cost,
        "confirmationNumber": booking.confirmation_number,
    }
    return JsonResponse(booking_data)




@login_required
def user_profile(request):
    user = request.user
    bookings = Booking.objects.filter(user=user)
    user_data = {
        "name": user.username,
        "email": user.email,
        "bookings": [
            {
                "id": booking.id,
                "movieTitle": booking.movie.title,
                "seats": booking.seats,
                "totalCost": booking.total_cost,
            }
            for booking in bookings
        ],
    }
    
    return JsonResponse(user_data)
           
User = get_user_model()
@api_view(['POST'])
def signup_view(request):
    name = request.data.get('name')
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        user.first_name = name  # Store the name
        user.save()
        return JsonResponse({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)  # Adjust this line if using username or email as unique identifier

    if user is not None:
        return JsonResponse({'message': 'User logged in successfully'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
class SeatListView(APIView):
    def get(self, request, movie_id):
        seats = Seat.objects.filter(movie_id=movie_id).values('seatNumber', 'is_available')
        seat_data = [{'seatNumber': seat['seatNumber'], 'available': seat['is_available']} for seat in seats]
        return Response({'seats': seat_data})


def get_seats(request, movie_id):
    movie = get_object_or_404(Movie, id=id)
    seats = Seat.objects.filter(movie=movie)
    
    seat_data = [{'seatNumber': seat.number, 'available': seat.is_available} for seat in seats]
    
    return JsonResponse({'seats': seat_data})
def get_available_seats(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    available_seats = Seat.objects.filter(movie=movie, is_available=True)

    # Prepare the seat data in JSON format
    seat_data = [{'seatNumber': seat.number, 'available': seat.is_available} for seat in available_seats]

    return JsonResponse({'seats': seat_data})
@api_view(['POST'])
def book_seats(request, id):
    selected_seats = request.data.get('seats', [])  # Get the selected seats from request data

    try:
        movie = Movie.objects.get(id=id)  # Get the movie by ID
        for seat_number in selected_seats:
            seat = Seat.objects.get(seatNumber=seat_number, movie=movie)  # Find the seat
            if seat.available:
                seat.available = False  # Mark the seat as booked
                seat.save()  # Save the changes
            else:
                return Response({'message': f'Seat {seat_number} is already booked.'}, status=400)
        return Response({'message': 'Seats booked successfully!'})
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)
    except Seat.DoesNotExist:
        return Response({'error': 'One or more seats are invalid'}, status=400)
logger = logging.getLogger(__name__)
class BookSeatsView(APIView):
    def post(self, request, movie_id):
        selected_seats = request.data.get('seats', [])
        
        if not selected_seats:
            return Response({'message': 'No seats selected.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Fetch the movie instance
            movie = Movie.objects.get(id=movie_id)

            # List to hold unavailable seats
            unavailable_seats = []

            for seat_number in selected_seats:
                try:
                    # Check if the seat exists and is available
                    seat = Seat.objects.get(movie=movie, seat_number=seat_number)
                    if seat.available:
                        # Book the seat by setting available to False
                        seat.available = False
                        seat.save()
                    else:
                        # If the seat is not available, add to the unavailable list
                        unavailable_seats.append(seat_number)
                except Seat.DoesNotExist:
                    unavailable_seats.append(seat_number)

            if unavailable_seats:
                return Response({
                    'message': 'Error booking seats. The following seats are not available: ' + ', '.join(unavailable_seats)
                }, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Seats booked successfully!'}, status=status.HTTP_200_OK)

        except Movie.DoesNotExist:
            return Response({'message': 'Movie not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            # Log the exception
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)