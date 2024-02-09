import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
