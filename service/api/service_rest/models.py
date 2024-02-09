from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=20, unique=True)
    id=id

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


# class Status(models.Model):
#     id = models.PositiveSmallIntegerField(primary_key=True)
#     name = models.CharField(max_length=10, unique=True)

# def __str__(self):
#     return self.name

#     class Meta:
#         ordering = ("id")
#         verbose_name_plural = "statuses"

class Appointment(models.Model):

    # @classmethod
    # def create(cls, **kwargs):
    #     kwargs["status"] = Status.objects.get(name="SUBMITTED")
    #     appointment = cls(**kwargs)
    #     appointment.save()
    #     return appointment

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="SCHEDULED")

    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete=models.CASCADE,
    )

    # status = models.ForeignKey(
    #     Status,
    #     related_name="appointments",
    #     on_delete=models.PROTECT,
    # )

    # def finish(self):
    #     status = Status.objects.get(name="FINISHED")
    #     self.status = status
    #     self.save()

    # def cancel(self):
    #     status = Status.objects.get(name="CANCELED")
    #     self.status = status
    #     self.save()

    # def get_api_url(self):
    #     return reverse("api_appointment", kwargs={"id": self.id})
