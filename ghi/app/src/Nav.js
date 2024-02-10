import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="automobiles/new">Add a Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="vehicles">Vehicles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="vehicles/new">Add a Vehicle</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="manufacturers/new">Add Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="salesperson/new">Add a Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="salespeople">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="customers/new">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="customers">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="sales/new">New Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="salespeople/history">SalesPerson History</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/api/technicians/list">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/api/technicians/add">Add Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/api/appointments/list">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/api/appointments/create">Create Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/api/appointments/history">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
