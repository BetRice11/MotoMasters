from django.urls import path

from .views import (
    api_technicians,
    api_technician,
    api_appointments,
    api_finish_appointment,
    api_cancel_appointment,

)

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        "technicians/:id",
        api_technician,
        name="api_technician",
    ),
    path(
        "appointments/",
        api_appointments,
        name="api_appointments",
    ),
    path(
        "appointments/:id/finish/",
        api_finish_appointment,
        name="api_finish_appointment",
    ),
    path(
        "appointments/:id/cancel/",
        api_cancel_appointment,
        name="api_cancel_appointment",
    ),
]
