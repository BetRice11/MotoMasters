from django.db import models
from django.urls import reverse

# Create your models here


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    class Meta:
        app_label = "sales_rest"

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=10)

    def get_api_url(self):
        return reverse("sales_person_delete", kwargs={"id": self.pk})


    def __str__(self):
        return f"{self.first_name} {self.last_name} (ID: {self.employee_id})"

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("customer_delete", kwargs={"id": self.pk})


    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone_number})"

class Sales(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    price = models.PositiveBigIntegerField()

    def get_api_url(self):
        return reverse('sales_delete', kwargs={"id": self.pk})
