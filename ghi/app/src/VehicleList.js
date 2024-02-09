import React, { useState, useEffect } from 'react';

function Vehicles() {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {

        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://localhost:8100/api/models/')
                const data = await response.json()
                console.log(data)
                setVehicles(data.models)
            } catch (error) {
                console.error('Error getting vehicles:', error)
            }
            }

        fetchVehicles()
    }, [])

    return (
    <div className="my-5 container">
        <div className="row">
        <h1>Models</h1>
            <table className="table table-striped m-3">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                    </tr>
                </thead>
                    <tbody>
                        {vehicles.map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{ model.name }</td>
                                    <td>{ model.manufacturer.name }</td>
                                    <td><img src={ model.picture_url } alt="vehicle" style={{width:'200px', height: '150px'}}/></td>
                                </tr>
                            );
                            })}
                    </tbody>
            </table>
        </div>
    </div>
)
}

export default Vehicles;
