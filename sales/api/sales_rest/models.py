from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.IntegerField(max_length=10)

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.Charfield (max_length=200)
    phone_number = models.models.PhoneNumberField(_(""))

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sold",
        on_delete=models.CASCADE,
    )
