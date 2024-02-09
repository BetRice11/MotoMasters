import React, { useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [salespeople, setSalesPeople] = useState([]);
    const [salesperson, setSalesPerson] = useState('');
    const [sales, setSales] = useState([]);

    const getSalesPeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    }

    const getSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        getSalesPeople();
        getSales();
    }, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    return (
        <div>
            <h1>Salesperson History</h1>
            <div>
                <select onChange={handleFormChange} value={salesperson} required name="salesperson" id="salesperson" className='form-select'>
                    <option>Select an Employee</option>
                    {salespeople && salespeople.map((salesperson) => (
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

export default SalesPersonHistory;
