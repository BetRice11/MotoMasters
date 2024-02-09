## CarCar

Team:

* Deane Logan - Sales
* Chestna Mitchell

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <<https://gitlab.com/BetRice11/project-beta>>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

## Diagram
 - Put diagram here

## Integration - It's me and you

Our Sales and Services domains work together with our Inventory domain to make everything here at CarCar possible.

How this all starts is with our inventory domain. We keep a record of manufacturers, vehicle models, and available automobiles that out dealership provides. Our sales and services microservices obtain information from the inventory domain, using a **poller**, which talks to the inventory domain to keep track of automobiles available for purchase so that clients always have up to date sales and service automobile information.

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

## Inventory

| Action | Method | URL
| ----------- | ----------- | ----------- |
Manufacturers:
-----------------------------------------------------------------
|List manufacturers | GET | http://localhost:8100/api/manufacturers/
|Create a manufacturer | POST | http://localhost:8100/api/manufacturers/
|Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/
|Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/
|Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/


Vehicles:
-----------------------------------------------------------------
| List vehicles  | GET | http://localhost:8100/api/models/
| Create a vehicle | POST | http://localhost:8100/api/models/
| Get a specific vehicle | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle | DELETE | http://localhost:8100/api/models/id/

Automobiles:
-----------------------------------------------------------------
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create a automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/id/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/id/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/id/

JSON body to send data:

Create/Update/List a manufacturers or a specific manufacturer (SEND THIS JSON BODY):
```
{
  "name": "Chrysler",
}

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}

Create/Update/List a vehicles or a specific vehicle (SEND THIS JSON BODY):
```
Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

```{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.

{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}

Getting a list of vehicle models returns a list of the detail information with the key "models".

{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}

```
Create/Update/List a automobiles or a specific automobile (SEND THIS JSON BODY):
```
You can create an automobile with its color, year, VIN, and the id of the vehicle model.

{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
You can update the color, year, and sold status of an automobile.

{
  "color": "red",
  "year": 2012,
  "sold": true
}
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```
# Sales Microservice

On the backend, the sales microservice has 4 models: AutomobileVO, Customer, Salesperson, and Sales. Sales is the main model for storing data on all of the sales in the database. Customer hold information on for shopper at the dealership. Salesperson holds the information of employees that sale vehicles. AutomobileVO populates off of a poller connected to the Automobile model in inventory

When a new sale is made access is needed to the automobiles stored at the inventory microservice. The AutomobileVO creates copies of those objects and makes them accessible to the sales model.

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Sales:

| Action | Method | URL
| ----------- | ----------- | ----------- |
Salepeople:
---------------------------------------------------------
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Create a hat | POST | http://localhost:8090/api/salepeople/
| Delete a specific  | DELETE | http://localhost:8090/api/salepeople/id/

Customer:
---------------------------------------------------------
| List salespeople | GET | http://localhost:8090/api/customer/
| Create a hat | POST | http://localhost:8090/api/customer/
| Delete a specific  | DELETE | http://localhost:8090/api/customer/id/

Sales:
---------------------------------------------------------
| List salespeople | GET | http://localhost:8090/api/sales/
| Create a hat | POST | http://localhost:8090/api/sales/
| Delete a specific  | DELETE | http://localhost:8090/api/sales/id/

Create a salesperson (SEND THIS JSON BODY):
```
{
	"first_name": "Tom",
	"last_name": "Cat",
	"employee_id": "354,
	}

```
Getting a list of salepeople:
```
"salesperson": [
		{
			"first_name": "Joe",
			"last_name": "Bro",
			"employee_id": "X12",
			"id": 3
		},
]

```
Create a customers:
```
{
	"first_name": "Nick",
	"last_name": "Jonas",
	"address": "124 Berry Lane",
	"phone_number": "124-125-1256"
}
```
List of customers:
```
"customer": [
		{
			"first_name": "Joe",
			"last_name": "Bro",
			"address": "123 Cherry Lane",
			"phone_number": "123-123-1234",
			"id": 1
		},
]
```
Create sale
```
{
	"automobile": "1FMZU62E01UB66709",
	"employee_id": "X12",
	"customer": 1,
	"price": "20000"
}
```
List of Sales:
```
"sales": [
		{
			"automobile": {
				"vin": "1FMZU62E01UB66709",
				"sold": false
			},
			"salesperson": {
				"first_name": "Joe",
				"last_name": "Bro",
				"employee_id": "X12",
				"id": 3
			},
			"customer": {
				"first_name": "Joe",
				"last_name": "Bro",
				"address": "123 Cherry Lane",
				"phone_number": "123-123-1234",
				"id": 1
			},
			"price": 20000,
			"id": 5
		},
]
