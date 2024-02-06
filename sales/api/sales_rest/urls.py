from django.urls import path
from .views import api_salespeople

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople")
]
