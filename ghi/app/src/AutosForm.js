import React, { useEffect, useState } from "react";


function AutosForm({ props, getAutomobiles }) {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model_id, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [submitted, setHasSubmitted] = useState(false);


    async function fetchAutos() {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
            }
        }

        useEffect(() => {
            fetchAutos();
        }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            color,
            year,
            vin,
            model_id,
        };

    const url = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newAutomobile = await response.json();
        setColor('');
        setYear('');
        setVin('');
        setModel('');
        setHasSubmitted(true);
        getAutomobiles();
    }
    }

    function handleChangeColor(event) {
        const { value } = event.target;
        setColor(value);
        }

        function handleChangeModel(event) {
        const { value } = event.target;
        setModel(value);
        }

        function handleChangeYear(event) {
        const { value } = event.target;
        setYear(value);
        }

        function handleChangeVin(event) {
        const { value } = event.target;
        setVin(value);
        }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an automobile to inventory</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeColor} placeholder="Color" required type="text" name="color" id="color" value={color} className="form-control"/>
                        <label htmlFor="color">Color...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeYear} placeholder="Year" required type="text" name="year" id="year" value={year} className="form-control"/>
                        <label htmlFor="year">Year...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeVin} placeholder="Fabric" required type="text" name="vin" id="vin" value={vin} className="form-control"/>
                        <label htmlFor="vin">VIN...</label>
                    </div>
                    <div>
                    </div>
                    <div className="mb-3">
                        <select value={model_id} onChange={handleChangeModel} required name="model_id" id="model_id" className="form-select">
                            <option value="">Choose a model...</option>
                            {models.map(model => {
                                return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
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


export default AutosForm
