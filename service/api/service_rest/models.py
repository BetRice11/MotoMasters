from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=20, unique=True)
    id = id


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="requested")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE
    )
    id = id
