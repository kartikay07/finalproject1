from django.urls import path
from .views import movie_list, movie_details, seat_selection, booking_summary, user_profile,signup_view, login_view
from .views import get_seats,get_available_seats,book_seats,BookSeatsView
from . import views
urlpatterns = [
    path('movies/', movie_list, name='movie-list'),
    path('movies/<int:id>/', movie_details, name='movie-details'),
    path('movies/<int:id>/seats/', seat_selection, name='seat-selection'),
    path('booking-summary/<int:id>/', booking_summary, name='booking-summary'),
    path('user/profile/', user_profile, name='user-profile'),
    path('user/signup/', signup_view, name='signup'),
    path('user/login/', login_view, name='login'),
    path('movies/<int:id>/seats/', get_seats, name='get_seats'),
    path('movies/<int:movie_id>/available-seats/', get_available_seats, name='get_available_seats'),
    path('movies/<int:id>/book-seats/', views.book_seats, name='book_seats'),
    path('movies/<int:id>/book-seats/', BookSeatsView.as_view(), name='book-seats'),
]
