import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import Salespeople from './Salespeople';
import Customers from './Customers';
import SalesForm from './NewSale';
import Automobiles from './AutosList';
import AutosForm from './AutosForm';
import Vehicles from './VehicleList';
import VehicleForm from './VehicleForm';
import Manufacturers from './ManufacturersList';
import ManufacturerForm from './ManufacturersForm';
import SalesPersonHistory from './SPHistory';
import TechniciansList from './TechniciansList';
import AddTechnician from './AddTechnician';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import AppointmentHistory from './AppointmentHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles/" element={<Automobiles />} />
          <Route path="automobiles/new" element={<AutosForm />} />

          <Route path="vehicles/" element={<Vehicles />} />
          <Route path="vehicles/new" element={<VehicleForm />} />

          <Route path="manufacturers/" element={<Manufacturers />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />


          <Route path="salesperson/new" element={<SalespersonForm />} />
          <Route path="salespeople/" element={<Salespeople />} />

          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="customers/" element={<Customers />} />

          <Route path="sales/new" element={<SalesForm />} />
          <Route path="salespeople/history" element={<SalesPersonHistory />} />
          <Route path="/api/technicians/list" element={<TechniciansList />} />
          <Route path="/api/technicians/add" element={<AddTechnician />} />
          <Route path="/api/technicians/create" element={<AddTechnician />} />
          <Route path="/api/appointments/create" element={<AppointmentForm />} />
          <Route path="/api/appointments/list" element={<AppointmentsList />} />
          <Route path="/api/appointments/history" element={<AppointmentHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
