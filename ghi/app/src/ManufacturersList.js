import React, { useState, useEffect } from 'react';

function Manufacturers() {
    const [manufacturers, setManufacturers] = useState([])

    useEffect(() => {

        const fetchManufacturers = async () => {
            try {
                const response = await fetch('http://localhost:8100/api/manufacturers/')
                const data = await response.json()
                console.log(data)
                setManufacturers(data.manufacturers)
            } catch (error) {
                console.error('Error getting manufacturers:', error)
            }
            }

        fetchManufacturers()
    }, [])

    return (
    <div className="my-5 container">
        <div className="row">
        <h1>Manufacturers</h1>
            <table className="table table-striped m-3">
                <thead>
                    <tr>
                    <th>Name</th>
                    </tr>
                </thead>
                    <tbody>
                        {manufacturers.map(manufacturer => {
                            return (
                                <tr key={manufacturer.id}>
                                    <td>{ manufacturer.name }</td>
                                </tr>
                            );
                            })}
                    </tbody>
            </table>
        </div>
    </div>
)
}

export default Manufacturers;
