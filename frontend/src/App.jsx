import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SelectRole from './pages/SelectRole';
import WorkerPhone from './pages/WorkerPhone';
import WorkerProfile from './pages/WorkerProfile';
import WorkerSuccess from './pages/WorkerSuccess';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerEdit from './pages/WorkerEdit';
import ClientSearch from './pages/ClientSearch';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/worker-phone" element={<WorkerPhone />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="/worker-success" element={<WorkerSuccess />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/worker-edit/:workerId" element={<WorkerEdit />} />
        <Route path="/client-search" element={<ClientSearch />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;