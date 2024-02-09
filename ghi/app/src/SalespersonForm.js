import React, {useState} from 'react';

function SalespersonForm(){
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [employee_id, setEmployee_Id] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.employee_id = employee_id

        const salespersonUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const salespersonResponse = await fetch(salespersonUrl, fetchConfig)
            if (salespersonResponse.ok) {
                setFirst_name('')
                setLast_name('')
                setEmployee_Id('')
            }else {
                throw new Error('Failed to add salesperson')
        }
        } catch (error) {
            console.error("Error adding salesperson:", error)
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
    const handleChangeEmployeeId = (event) => {
        const value = event.target.value
        setEmployee_Id(value)
    }

    return (
        <div className="my-5 container">
            <div className="row">
            <div className="col col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Salesperson</h1>
                <form onSubmit={handleSubmit} id="create-salesperson-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeFirstName} placeholder="First Name" autoComplete='off' required type="text" id="first_name" name="first_name" value={first_name} className="form-control" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeLastName} placeholder="Last Name" autoComplete='off' required type="text" id="last_name" name="last_name" value={last_name} className="form-control" />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangeEmployeeId} placeholder="Employee ID" autoComplete='off' required type="text" id="employee_id" name="employee_id" value={employee_id} className="form-control" />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-success">Create</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SalespersonForm
