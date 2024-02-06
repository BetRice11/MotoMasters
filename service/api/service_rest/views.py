from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Technician
from .encoders import (
	TechnicianEncoder,
)


# Create your views here.
@require_http_methods(["GET","POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians}
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
