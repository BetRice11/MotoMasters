from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Technician, Appointment
from .encoders import (
	TechnicianEncoder,
    AppointmentEncoder,
)


# Create your views here.

@require_http_methods(["GET","POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_appointments(request):
	if request.method == "GET":
		appointments = Appointment.objects.all()
		return JsonResponse(
			{"appointments": appointments},
			encoder=AppointmentEncoder,
			safe=False,
		)
	else:
          try:
               print(request.body)
               content = json.loads(request.body)
               print(content)
               employee_id = content["technician"]
               print(employee_id)
               technician = Technician.objects.get(pk=employee_id)
               print(technician)
               content["technician"] = technician
               appointment = Appointment.objects.create(**content)
               return JsonResponse(
                    appointment,
                    encoder=AppointmentEncoder,
                    safe=False,
               )

          except:
               response = JsonResponse(
                    {"message": "Could not set the appointment"}
               )
               response.status_code = 400
               return response


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    content = {}
    content["status"] = "FINISHED"
    Appointment.objects.filter(pk=id).update(**content)
    appointment = Appointment.objects.get(pk=id)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    content = {}
    content["status"] = "CANCELED"
    Appointment.objects.filter(pk=id).update(**content)
    appointment = Appointment.objects.get(pk=id)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )

@require_http_methods("DELETE")
def api_technician(request, employee_id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(ID=Technician.employee_id).delete()
        return JsonResponse({"deleted": count > 0})
