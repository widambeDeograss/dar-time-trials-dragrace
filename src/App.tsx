// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';


import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-white">DAR Time Trials</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-200 text-white">Registration</Link>
            {/* <Link to="/registrations" className="hover:text-gray-200">View Entries</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/app/registrations" element={<RegistrationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/components/Navbar.jsx



