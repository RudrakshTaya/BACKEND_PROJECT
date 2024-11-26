import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginSignup from './Pages/adminLogin';
import AdminDashboard from './Pages/adminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
      
        <main>
          <Routes>
           
            <Route
              path="/login"element={< LoginSignup/>}
            />
       
          <Route
              path="/"element={< AdminDashboard/>}
            />
            </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
