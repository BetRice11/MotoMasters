from django.contrib import admin
from .models import AutomobileVO, Sales, Customer, Salesperson
# Register your models here.

admin.site.register(AutomobileVO)
admin.site.register(Sales)
admin.site.register(Salesperson)
admin.site.register(Customer)
