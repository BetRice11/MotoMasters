import React, {useEffect, useState} from 'react';

function CustomerForm(){
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhone_Number] = useState('')

    // const fetchData = async () => {
    //     const url = 'http://localhost:8090/api/customers/'
    //     const response = await fetch(url)
    //     if (response.ok) {
    //         const data = await response.json()
    //         set
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.address = address
        data.phone_number = phone_number

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const customerResponse = await fetch(customerUrl, fetchOptions)
            if (customerResponse.ok) {
                setFirst_name('')
                setLast_name('')
                setAddress('')
                setPhone_Number('')
            } else {
                throw new Error('Failed to add customer')
        }
        } catch (error) {
            console.error("Error adding customer:", error)
        }
    }

    const handleChangeFirstName = (event) => {
        const value = event.target.value
        setFirst_name(value)
    }
    const handleChangeLastName = (event) => {
        const value = event.target.value
        setLast_name(value)
    }
    const handleChangeAddress = (event) => {
        const value = event.target.value
        setAddress(value)
    }
    const handleChangePhoneNumber = (event) => {
        const value = event.target.value
        setPhone_Number(value)
    }

    return (
        <div className="my-5 container">
            <div className="row">
            <div className="col col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form onSubmit={handleSubmit} id="create-salesperson-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeFirstName} placeholder="FirstName" autoComplete='off' required type="text" id="first_name" name="first_name" value={first_name} className="form-control" />
                    <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeLastName} placeholder="Last Name" autoComplete='off' required type="text" id="last_name" name="last_name" value={last_name} className="form-control" />
                    <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleChangeAddress} placeholder="Phone Number" autoComplete='off' required type="text" id="address" name="address" value={address} className="form-control" />
                    <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleChangePhoneNumber} placeholder="Phone Number" autoComplete='off' required type="text" id="phone number" name="phone number" value={phone_number} className="form-control" />
                    <label htmlFor="phone number">Phone Number</label>
                    </div>
                    <button className="btn btn-success">Create</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CustomerForm
