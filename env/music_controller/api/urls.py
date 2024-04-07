from django.urls import path
from .views import RoomView, CreateRoomView, JoinRoom, UserInRoom, LeaveRoom, GetRoom

urlpatterns = [
    path('rooms', RoomView.as_view()),
    path('createroom', CreateRoomView.as_view()),
    path('getroom', GetRoom.as_view()),
    path('joinroom', JoinRoom.as_view()),
    path('userinroom', UserInRoom.as_view()),
    path('leaveroom', LeaveRoom.as_view()),
]
