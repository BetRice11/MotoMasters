import { NavLink} from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/api/technicians/list">Technicians</NavLink>
          <NavLink className="navbar-brand" to="/api/technicians/add">Add Technician</NavLink>
          <NavLink className="navbar-brand" to="/api/appointments/list">Service Appoinments</NavLink>
          <NavLink className="navbar-brand" to="/api/appointments/create">Create Service Appointment</NavLink>
          <NavLink className="navbar-brand" to="/api/appointments/history">Service History</NavLink>
        </div>
      </nav>
    </>
  )
}

export default Nav;
