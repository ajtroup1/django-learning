from django.urls import path, include
from .views import RoomView

urlpatterns = [
    path('rooms', RoomView.as_view())
]
