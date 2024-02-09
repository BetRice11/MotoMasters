import React, {useEffect, useState} from 'react';


function ManufacturerForm() {
    const [name, setName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const manufacturerResponse = await fetch(manufacturerUrl, fetchOptions)
            if (manufacturerResponse.ok) {
                setName('')
            } else {
                throw new Error('Failed to add manufacturer')
            }
        } catch (error) {
            console.error("Error adding manufacturer:", error)
        }
    }

    const handleChangeName = (event) => {
        const value = event.target.value
        setName(value)
    }

    return (
        <div className="my-5 container">
            <div className="row">
            <div className="col col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add Manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeName} placeholder="Name" autoComplete='off' required type="text" id="name" name="name" value={name} className="form-control" />
                    <label htmlFor="name">Name</label>
                    </div>
                    <button className="btn btn-success">Create</button>
                </form>
                </div>
            </div>
            </div>
        </div>
)
}


export default ManufacturerForm
