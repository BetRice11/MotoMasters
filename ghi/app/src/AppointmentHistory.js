import { useState, useEffect } from 'react';

function AppointmentHistory() {
    const [appointments, SetAppointments] = useState([])
    const [error, setError] = useState(null);

    const getData = async () => {
        const response = await fetch ('http://localhost:8080/api/appointments');
        if (response.ok) {
            const { appointments } = await response.json();
            SetAppointments(appointments);
        } else {
            alert('An error occurred fetching the data');
        }
    }

    useEffect (() => {
        getData()
    }, []);

    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Appointments</h1>
                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Date & Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => {
                            return (
                                <tr key = {appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{new Date(appointment.date_time).toLocaleString()}</td>
                                    <td>{appointment.technician.first_name}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentHistory;
