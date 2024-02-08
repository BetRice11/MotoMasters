from django.contrib import admin

from service_rest.models import Appointment, AutomobileVO, Technician

# Register your models here.
admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(Appointment)
