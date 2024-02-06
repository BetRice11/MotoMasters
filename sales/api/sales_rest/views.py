from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Sales, AutomobileVO, Customer, Salesperson
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not get the salesperson"}
            )
            response.status_code = 400
            return response
