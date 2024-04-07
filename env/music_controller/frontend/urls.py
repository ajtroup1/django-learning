from django.urls import path
from .views import index

urlpatterns = [
    #admin domain for urls
    path('', index), 
]