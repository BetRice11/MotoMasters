import React, {useEffect, useState } from 'react';

function Salespeople() {
    const [salesperson, setSalesperson] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const { salesperson } = await response.json()
            setSalesperson(salesperson)
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
            <h1>Current Salespeople</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesperson.map(salesperson => {
                        return (
                            <tr key={salesperson.id}>
                                <td>{ salesperson.first_name }</td>
                                <td>{ salesperson.last_name }</td>
                                <td>{ salesperson.employee_id }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Salespeople
