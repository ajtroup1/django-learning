from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer

class RoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all() #return all room objects
    serializer_class = RoomSerializer #serialize room objects into readable JSON objects