import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [vin, setVin] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const [technicians, setTechnicians] = useState([]);

    const getData = async ()=> {
        const response = await fetch('http:localhost:8080/api/technicians/');
        if (response.ok) {
            const { technicians } = await response.json();
            setTechnicians(technicians);
        } else {
            console.error('An error occurred fetchhing the data')
        }
    }

    useEffect(()=> {
        getData()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const appointmentData = {
            vin: vin,
            customer_name: customerName,
            date: date,
            time: time,
            employee_id: technician,
            reason: reason,
        };

        try {
            const response = await fetch('http://localhost:8080/api/appointments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            if (response.ok) {
                alert('Appointment set');
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Appointment not set:', error);
            alert('Could not set appointment');
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new appointment</h1>
                        <form onSubmit={handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleVinChange} value={vin} placeholder="1A2B3CD45E6F7G8I" required type="text" id="vin" className="form-control" />
                                <label htmlFor="vin">vin</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleCustomerChange} value={customer} placeholder="Your Name" required type="text" id="customer" className="form-control" />
                                <label htmlFor="customer">vin</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleDateChange} value={date} placeholder="12-12-2024" required type="date" id="date" className="form-control" />
                                <label htmlFor="customer">date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleTimeChange} value={time} placeholder="13:00" required type="time" id="time" className="form-control" />
                                <label htmlFor="customer">vin</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleReasonChange} value={reason} placeholder="What service does your automobile need?" required type="text" id="cureason" className="form-control" />
                                <label htmlFor="customer">vin</label>
                            </div>
                            <label>
                                Technician:
                                <select value={technician} onChange={(e) => setTechnician(e.target.value)}>
                                    <option value="">Select a Technician</option>
                                    {technicians.map(tech => (
                                        <option key={tech.employee_id} value={tech.employee_id}>
                                            {tech.first_name} {tech.last_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Set Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default AppointmentForm;
