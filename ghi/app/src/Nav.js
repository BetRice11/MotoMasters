import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <NavLink className="navbar-brand" to="/api/manufacturers/">Manufacturers</NavLink>
          <NavLink className="navbar-brand" to="/api/manufacturers/">Create a Manufacturer</NavLink>
          <NavLink className="navbar-brand" to="/api/models/">Models</NavLink>
          <NavLink className="navbar-brand" to="/api/models/">Models</NavLink>
          <NavLink className="navbar-brand" to="/api/automobiles/">Automobiles</NavLink>
          <NavLink className="navbar-brand" to="/api/automobiles/">Create an Automobile</NavLink>
        </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/api/salespeople/">Salespeople</NavLink>
          <NavLink className="navbar-brand" to="/api/salespeople/">Add a Salesperson</NavLink>
          <NavLink className="navbar-brand" to="/api/customers/">Customers</NavLink>
          <NavLink className="navbar-brand" to="/api/customers/">Add a customer</NavLink>
          <NavLink className="navbar-brand" to="/api/sales/">Sales</NavLink>
          <NavLink className="navbar-brand" to="/api/sales/">Sales History</NavLink>
        </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/api/technicians/">Technicians</NavLink>
          <NavLink className="navbar-brand" to="/api/technicians/">Add Technician</NavLink>
          <NavLink className="navbar-brand" to="/api/appointments/">Service Appoinments</NavLink>
          <NavLink className="navbar-brand" to="/api/appointments/">Create Service Appointment</NavLink>
          <NavLink className="navbar-brand" to="/api/sales/">Service History</NavLink>
        </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
          </div>
      </nav>
    </>
  )
}

export default Nav;
