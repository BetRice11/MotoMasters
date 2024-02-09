import React, {useEffect, useState } from 'react';

function SalesForm(){
    const [automobile, setAutomobile] = useState([])
    const [selectedAutomobile, setSelectedAutomobile] = useState('')
    const [salespeople, setSalespeople] = useState([])
    const [selectedSalesperson, setSelectedSalesperson] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [customers, setCustomers] = useState([])
    const [price, setPrice] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const automobileUrl = 'http://localhost:8100/api/automobiles/'
            const automobileResponse = await fetch(automobileUrl)
            if (automobileResponse.ok) {
                const data = await automobileResponse.json()
                setAutomobile(data.autos)
            }
            const salespersonUrl = 'http://localhost:8090/api/salespeople/'
            const salespersonResponse = await fetch(salespersonUrl)
            if (salespersonResponse.ok) {
                const data = await salespersonResponse.json()
                console.log("salespeople:", data.salesperson)
                setSalespeople(data.salesperson)
            }
            const customerUrl = 'http://localhost:8090/api/customers/'
            const customerResponse = await fetch(customerUrl)
            if (customerResponse.ok) {
                const data = await customerResponse.json()
                console.log("customers:", data.customer)
                setCustomers(data.customer)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = {
        automobile: selectedAutomobile,
        salesperson: selectedSalesperson,
        customer: selectedCustomer,
        price: price
        }

        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const salesResponse = await fetch(salesUrl, fetchConfig)
            if (salesResponse.ok) {
                setSelectedAutomobile('')
                setSelectedSalesperson('')
                setSelectedCustomer('')
                setPrice('')
            } else {
            throw new Error('Failed to add sale')
            }
        } catch (error) {
            console.error("Error adding sale:", error)
        }
    }


    return (
        <div className="my-5 container">
            <div className="row">
            <div className="col col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Sale</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <label htmlFor="automobile">Select Automobile:</label>
                            <select id="automobile" value={selectedAutomobile} onChange={(e) => setSelectedAutomobile(e.target.value)} className="form-control" required>
                            <option value="">Select an Automobile</option>
                            {automobile.length > 0 && automobile.map((auto) => (
                                <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor="salesperson">Select Salesperson:</label>
                            <select id="salesperson" value={selectedSalesperson} onChange={(e) => setSelectedSalesperson(e.target.value)} className="form-control" required>
                            <option value="">Select a Salesperson</option>
                            {salespeople.length > 0 && salespeople.map((salesperson) => (
                                <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor="customer">Select Customer:</label>
                            <select id="customer" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} className="form-control" required>
                            <option value="">Select a Customer</option>
                            {customers.length > 0 && customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-success">Record Sale</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SalesForm


import React, {useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [salespeople, setSalesPeople] = useState([]);
    const [salesperson, setSalesPerson] = useState('');
    const [sales, setSales] = useState([]);

    const getSalesPeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if(response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    }
    const getSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if(response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }
    useEffect(()=> {
        getSalesPeople();
        getSales();
    },[])
    const handleFormChange = (event) => {
        const target = event.target;
        const value = target.value;
        setSalesPerson(value);
    }
    return(
    <div>
        <h1>Salesperson History</h1>
        <div>
            <select onChange={handleFormChange}
            placeholder="Select an employee"
            value={salesperson} required name="salesperson"
            id="salesperson" className='form-select'>
                <option>Select an Employee</option>
                {salespeople.map((salesperson) => {
                    return (
                    <option key={salesperson.id}  value={salesperson.id}>
                    {salesperson.first_name}
                    </option>
                    )
                })}
            </select>
        </div>
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.filter(sale => sale.salesperson.id === +salesperson)
                .map(({id, salesperson: person, automobile, customer, price}) =>
                    <tr key={id}>
                        <td>{person.first_name + ' ' + person.last_name}</td>
                        <td>{customer.first_name + ' ' + customer.last_name}</td>
                        <td>{automobile.vin}</td>
                        <td>{"$"+price}</td>
                    </tr>
                )}
            </tbody>

        </table>
        </div>
    </div>
    )
}
export default SalesPersonHistory;



const [automobile, setAutomobile] = useState([])
    const [selectedAutomobile, setSelectedAutomobile] = useState('')
    const [salespeople, setSalespeople] = useState([])
    const [selectedSalesperson, setSelectedSalesperson] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [customers, setCustomers] = useState([])
    const [price, setPrice] = useState('')
    const [hasCreatedNewSale, setHasCreatedNewSale] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const automobileUrl = 'http://localhost:8100/api/automobiles/'
            const automobileResponse = await fetch(automobileUrl)
            if (automobileResponse.ok) {
                const data = await automobileResponse.json()
                const unsoldAutomobiles = data.autos.filter(auto => !auto.sold)
                setAutomobile(unsoldAutomobiles)
            }
            const salespersonUrl = 'http://localhost:8090/api/salespeople/'
            const salespersonResponse = await fetch(salespersonUrl)
            if (salespersonResponse.ok) {
                const data = await salespersonResponse.json()
                setSalespeople(data.salesperson)
            }
            const customerUrl = 'http://localhost:8090/api/customers/'
            const customerResponse = await fetch(customerUrl)
            if (customerResponse.ok) {
                const data = await customerResponse.json()
                setCustomers(data.customer)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = {
            automobile: selectedAutomobile,
            salesperson: selectedSalesperson,
            customer: selectedCustomer,
            price: price
        }

        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const salesResponse = await fetch(salesUrl, fetchConfig)
            if (salesResponse.ok) {
                setSelectedAutomobile('')
                setSelectedSalesperson('')
                setSelectedCustomer('')
                setPrice('')
            } else {
            throw new Error('Failed to add sale')
            }
        } catch (error) {
            console.error("Error adding sale:", error)
        }
    }

        if(response.ok){
            const url = `http://localhost:8100/api/automobiles/${formData.automobile}/`;
            const fetchConfig = {
                method:"put",
                body: JSON.stringify({'sold':true }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const responseUpdateVehicle = await fetch(url, fetchConfig);
            if (!responseUpdateVehicle.ok) {
            throw new Error('Failed to update');
            }
            setHasCreatedNewSale(true);
    }



    const handleAutomobileChange = (event) => {
        setSelectedAutomobile(event.target.value)
    }

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value)
    }

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="col col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Sale</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <label htmlFor="automobile"></label>
                                <select id="automobile" value={selectedAutomobile} onChange={handleAutomobileChange} className="form-control" required>
                                    <option value="">Select an Automobile</option>
                                    {automobile.map(auto => {
                                        if(auto.sold === false){
                                        return(<option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                                    )};
                                })};
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="salesperson"></label>
                                <select id="salesperson" value={selectedSalesperson} onChange={handleSalespersonChange} className="form-control" required>
                                    <option value="">Select a Salesperson</option>
                                    {salespeople.map((salesperson) => (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="customer"></label>
                                <select id="customer" value={selectedCustomer} onChange={handleCustomerChange} className="form-control" required>
                                    <option value="">Select a Customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="price">Price:</label>
                                <input type="number" id="price" value={price} onChange={handlePriceChange} className="form-control" required />
                            </div>
                            <button type="submit" className="btn btn-success">Record Sale</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


import React, { useState, useEffect } from 'react';

function SaleForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState("");
    const [salespeople, setSalesPeople] = useState([]);
    const [salesperson, setSalesPerson] = useState("");
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const [price, setPrice] = useState([]);

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.automobile = automobile;
        data.customer = customer;
        data.salesperson = salesperson;
        data.price = price;

        const saleURL = `http://localhost:8090/api/sales/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(saleURL, fetchConfig);
        if (response.ok) {
            await response.json();

            const automobileURL = `http://localhost:8100${automobile}`;
            const automobileConfig = {
                method: 'PUT',
                body: JSON.stringify({ ...automobile, sold: true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const automobileResponse = await fetch(automobileURL, automobileConfig);
            if (automobileResponse.ok) {
                console.log('Automobile successfully sold');
            } else {
                console.log('Failed to see automobile');
            }

            setPrice('');
            setAutomobile('');
            setSalesPerson('');
            setCustomer('');
        }
    }
    const fetchData = async () => {
        const automobilesFetch = await fetch('http://localhost:8100/api/automobiles/');
        const customersFetch = await fetch('http://localhost:8090/api/customers/');
        const salesPeopleFetch = await fetch('http://localhost:8090/api/salespeople/');

        if (automobilesFetch.ok && customersFetch.ok && salesPeopleFetch.ok) {
            const automobileData = await automobilesFetch.json();
            const unsoldAutomobiles = automobileData.autos.filter(
                automobile => automobile.sold === false
            );

            const customerData = await customersFetch.json();
            const salespersonData = await salesPeopleFetch.json();
            console.log("Automobiles:", unsoldAutomobiles);
            console.log("Customers:", customerData.customer);
            console.log("Salesperson:", salespersonData.salesperson);
            setAutomobiles(unsoldAutomobiles);
            setCustomer(customerData.customer);
            setSalesPerson(salespersonData.salesperson)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Sale</h1>
                        <form onSubmit={handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <select value={automobile} onChange={handleAutomobileChange} placeholder="Automobile" required id="automobile" className="form-select" name="automobile">
                                    <option value="">Choose an automobile</option>
                                    {automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.vin}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select value={salesperson} onChange={handleSalesPersonChange} placeholder="Sales Person" required id="salesperson" name="salesperson" className="form-select">
                                    <option value="">Choose a Sales Person</option>
                                    {salespeople.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.employee_id}>
                                                {salesperson.first_name} {salesperson.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select value={customer} required name="customer" id="customer" className="form-select" onChange={handleCustomerChange}>
                                    <option value="">Choose a Customer</option>
                                    {customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.first_name} {customer.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={price} onChange={handlePriceChange} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SaleForm;

import React, { useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [salespeople, setSalesPeople] = useState([])
    const [salesperson, setSalesPerson] = useState('')
    const [sales, setSales] = useState([])

    const getSalesPeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json()
            console.log('salePeople data:', data)
            setSalesPeople(data.salespeople)
        }
    }

    const getSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const data = await response.json()
            console.log("Sales data:", data)
            setSales(data.sales)
        }
    }

    useEffect(() => {
        getSalesPeople()
        getSales()
    }, [])

    const handleFormChange = (event) => {
        const value = event.target.value
        console.log("Selected salesperson:", value)
        setSalesPerson(value)
    }

    console.log("Salespeople:", salespeople)

    return (
        <div>
            <h1>Salesperson History</h1>
            <div>
                <select onChange={handleFormChange} value={salesperson} required name="salesperson" id="salesperson" className='form-select'>
                    <option>Select an Employee</option>
                    {salespeople.map((salesperson) => (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.first_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter(sale => sale.salesperson.id === +salesperson)
                            .map(({ id, salesperson: person, automobile, customer, price }) => (
                                <tr key={id}>
                                    <td>{person.first_name + ' ' + person.last_name}</td>
                                    <td>{customer.first_name + ' ' + customer.last_name}</td>
                                    <td>{automobile.vin}</td>
                                    <td>{"$" + price}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesPersonHistory
