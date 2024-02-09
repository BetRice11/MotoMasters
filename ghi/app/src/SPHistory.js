import React, { useEffect, useState } from 'react';

function SalesPersonHistory() {
    const [sales, setSales] = useState([]);
    const [salesPeople, setSalesPeople] = useState([]);
    const [selectedSalesPerson, setSelectedSalesPerson] = useState('')
    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const salesResponse = await fetch('http://localhost:8090/api/sales/');
                const salesPeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
                if (!salesResponse.ok || !salesPeopleResponse.ok) {
                    throw new Error('Failed to fetch data')
                }
                const salesData = await salesResponse.json()
                const salesPeopleData = await salesPeopleResponse.json()
                console.log('Sales Data:', salesData)
                console.log('Sales People Data:', salesPeopleData)
                setSales(salesData.sales)
                setSalesPeople(salesPeopleData.salespersons)
            } catch (error) {
                console.error('An error occurred fetching the data:', error)
            }
        };
        getData()
    }, [])

    const handleSalesPersonChange = (event) => {
        const [id, firstName, lastName] = event.target.value.split(',')
        setEmployeeId(id)
        setFirstName(firstName)
        setLastName(lastName)
    };

    const filterByName = (sales, first, last, employeeId) => {
        return sales.filter(sale =>
            sale.sales_person &&
            (
            sale.sales_person.first_name === first &&
            sale.sales_person.last_name === last &&
            sale.sales_person.employee_id.toString() === employeeId
        ) ||
        (
            selectedSalesPerson &&
                    sale.sales_person.employee_id.toString() === selectedSalesPerson.split(',')[0]
            )
        )
    };

    const filteredSales = filterByName(sales, firstName, lastName, employeeId);

    let dropdownClasses = 'form-select d-none';
    if (Array.isArray(salesPeople) && salesPeople.length > 0) {
        dropdownClasses = 'form-select';
    }

    return (
        <div>
            <div className="my-5 container">
                <div className="row">
                    <h1>Salesperson History</h1>
                    <div className="mb-3">
                        <select onChange={handleSalesPersonChange} required name="salesperson" id="salesperson" className={dropdownClasses}>
                            <option value="">Choose a salesperson...</option>
                            {salesPeople && salesPeople.map(salesperson => (
                                <option key={salesperson.href} value={[salesperson.employee_id, salesperson.first_name, salesperson.last_name].join(',')}>Employee ID: {salesperson.employee_id} &nbsp;&nbsp; Name: {salesperson.first_name} {salesperson.last_name}</option>
                            ))}
                        </select>
                    </div>
                    <table className="table table-striped m-3">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee ID</th>
                                <th>Customer</th>
                                <th>Price</th>
                                <th>Vin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map(sale => (
                                <tr key={sale.id} value={sale.id}>
                                    <td>{sale.sales_person.first_name}</td>
                                    <td>{sale.sales_person.employee_id}</td>
                                    <td>{sale.customer.first_name}</td>
                                    <td>{sale.price}</td>
                                    <td>{sale.automobile.vin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesPersonHistory;
