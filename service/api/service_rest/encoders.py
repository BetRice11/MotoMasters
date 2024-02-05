
from common.json import ModelEncoder

from .models import Technician, AutomobileVO, Appointment


class TechnicianEncoder(ModelEncoder):
	model = Technician
	properties = [
		"first_name",
		"last_name",
		"employee_id",
	]


class AutomobileVOEncoder(ModelEncoder):
	properties = [
		"vin",
		"sold",
	]


class AppointmentEncoder(ModelEncoder):
	properties = [
		"date_time",
		"status",
		"vin",
		"customer",
		"technician",
	]
	encoders = {
		"technician" : TechnicianEncoder(),
	}
