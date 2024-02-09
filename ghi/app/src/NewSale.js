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
            console.log("Customer:", customerData.customer);
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
