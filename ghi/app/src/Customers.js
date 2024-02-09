import React, {useEffect, useState } from 'react';

function Customers() {
    const [customer, setCustomer] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/')
        if (response.ok) {
            const { customer } = await response.json()
            setCustomer(customer)
        } else {
            console.error('An error occurred fetching data')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="my-5 container">
            <div className="row">
            <h1>Current Customers</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{ customer.first_name }</td>
                                <td>{ customer.last_name }</td>
                                <td>{ customer.address }</td>
                                <td>{ customer.phone_number }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customers
