from django.urls import path
from .views import(
api_technicians,
)

urlpatterns=[
	path(
		"technicians/", api_technicians, name="technicians"
	),
]
