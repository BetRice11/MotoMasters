# CarCar

Team:

* Deanne Logan - Sales
* Chestna Mitchell - Service

## Design

## Service microservice

The Service microservice tracks service Appointments for Automobiles. Each service Appointment is at one specified date and time and is performed by one Technician for one Automobile.

Models:
Technician
	The employee who provides auto services.
	There is a one-to-many relationship between Technician and Appointment
	Fields included are first_name, last_name, employee_id, and id

Appointment
	A certain date and time reserved for providing service on an Automobile.
	Fields included are date_time, reason, status, vin, customer, and technician.
	The technician field is a foreign key related to the Technician model.


AutomobileVO
	This model is updated every 60 seconds by polling the Inventory service.
	Fields included are vin and sold.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.






































## Sales microservice

Explain your models and integration with the inventory
microservice, here.
