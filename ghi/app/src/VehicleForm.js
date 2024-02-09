import React, { useState, useEffect } from 'react'

function CreateVehicle() {
    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturer_id, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    async function fetchData() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            console.log('Manufacturers data:', data.manufacturers)
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        console.log('Fetching manufacturers..')
        fetchData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value
        console.log('Name:', value)
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        console.log('Picture Url:', value)
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        console.log('Manufacturer ID:', value)
        setManufacturer(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            name,
            picture_url,
            manufacturer_id,
        }
        console.log('Form data:', data)

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newVehicle = await response.json()
            console.log('New vehicle:', newVehicle)

            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a model</h1>
                    <form onSubmit={handleSubmit} id="create-vehicle-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={name} className="form-control"/>
                        <label htmlFor="name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePictureUrlChange} placeholder="Picture" required type="url" name="picture_url" id="picture_url" value={picture_url} className="form-control"/>
                        <label htmlFor="picture_url">Image</label>
                    </div>
                    <div className="mb-3">
                        <select value={manufacturer_id} onChange={handleManufacturerChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                            <option value="">Choose a manufacturer</option>
                            {manufacturers.map(manufacturer => {
                                return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default CreateVehicle
