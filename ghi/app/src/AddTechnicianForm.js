import React, {useEffect, useState} from 'react';

function AddTechnicianForm() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            first_name: first_name,
            last_name: last_name,
            employee_id: employee_id
        };

        const techUrl = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            },
        };

        try {
            const techResponse = await fetch(techUrl, fetchOptions);
            if (techResponse.ok) {
                setFirstName('');
                setLastName('');
                setEmployeeId('');
                alert('Technician added');
            } else {
                alert('Could not add technician');
            }
        } catch (error) {
            console.error('Error adding technician:', error);
            alert('error');
        }
    };

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleChangeEmployeeId = (e) => {
        setEmployeeId(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={first_name} onChange={handleChangeFirstName} />
            </label>
            <label>
                Last Name:
                <input type="text" value={last_name} onChange={handleChangeLastName} />
            </label>
            <label>
                Employee ID:
                <input type="text" value={employee_id} onChange={handleChangeEmployeeId} />
            </label>
            <button type="submit">Add Technician</button>
        </form>
    );
}

export default AddTechnicianForm;
