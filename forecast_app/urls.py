from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('autocomplete/', views.autocomplete, name='autocomplete'),
    path('get_city_by_coords/', views.get_city_by_coords, name='get_city_by_coords'),
]