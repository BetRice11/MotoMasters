import { useState, useEffect } from 'react';

function AppointmentsList() {
    const [appointments, SetAppointments] = useState([])
    const [error, setError] = useState(null);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments');
        if (response.ok) {
            const { appointments } = await response.json();
            SetAppointments(appointments);
        } else {
            alert('An error occurred fetching the data');
        }
    }

    useEffect(() => {
        getData()
    }, []);

    async function handleCancel(appointmentId) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentId)
        };

        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}/cancel`, options);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }

    }

    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Appointments</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.technician.first_name}</td>
                                    <td>{appointment.reason}</td>
                                    <td><button onClick={() => handleCancel(appointment.id)}>Cancel</button></td>
                                    <td><button onClick={() => handleFinish(appointment.id)}>Finish</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentsList;
