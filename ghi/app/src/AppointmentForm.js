import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [vin, setVin] = useState('');
    const [customer, setCustomerName] = useState('');
    const [date_time, setDate] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        getTechnicians();
    }, []);

    async function getTechnicians() {
        const response = await fetch('http://localhost:8080/api/technicians');
        const data = await response.json();
        setTechnicians(data.technicians);
    }

    function handleSubmit(e) {
        e.preventDefault();
        createAppointment();
    }

    async function createAppointment() {
        const appointment = {
            vin,
            customer,
            date_time,
            technician,
            reason
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment)
        };

        try {
            const response = await fetch('http://localhost:8080/api/appointments/', options);
            const data = await response.json();
            alert(`Appointment created with technician ID: ${data?.technician?.employee_id}`);
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="vin" placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} />
                            <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="customer" placeholder="Customer Name" value={customer} onChange={(e) => setCustomerName(e.target.value)} />
                            <label htmlFor="customer">Customer Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="date" placeholder="Date" value={date_time} onChange={(e) => setDate(e.target.value)} />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-control" id="technician" value={technician} onChange={(e) => setTechnician(e.target.value)}>
                                <option value="">Select a Technician</option>
                                {technicians.map((tech) => (
                                    <option key={tech.id} value={tech.id}>{tech.first_name}{tech.last_name}</option>
                                ))}
                            </select>
                            <label htmlFor="technician">Technician</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" id="reason" placeholder="Reason for appointment" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                            <label htmlFor="reason">Reason for Appointment</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppointmentForm;
