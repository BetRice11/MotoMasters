import React, {useEffect, useState } from 'react';

function Automobiles() {
    const [automobiles, setAutomobiles] = useState([])

    useEffect(() => {

        const fetchAutomobiles = async () => {
            try {
                const response = await fetch('http://localhost:8100/api/automobiles/')
                const data = await response.json()
                console.log(data)
                setAutomobiles(data.autos)
            } catch (error) {
                console.error('Error fetching automobiles:', error);
        }
        }

        fetchAutomobiles()
    }, [])

    return (
        <div className="my-5 container">
            <div className="row">
            <h1>Current Automobiles</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                        </tr>
                    </thead>
                        <tbody>
                            {automobiles.map(automobile => {
                                return (
                                    <tr key={automobile.id}>
                                        <td>{ automobile.vin }</td>
                                        <td>{ automobile.color }</td>
                                        <td>{ automobile.year }</td>
                                        <td>{ automobile.model.name }</td>
                                        <td>{ automobile.model.manufacturer.name }</td>
                                        <td>{ automobile.sold ? 'Yes' : 'No' }</td>
                                    </tr>
                                );
                                })}
                        </tbody>
                </table>
            </div>
        </div>
    )
}

export default Automobiles
