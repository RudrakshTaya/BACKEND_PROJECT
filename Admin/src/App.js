import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginSignup from './Pages/adminLogin';
import AdminDashboard from './Pages/adminDashboard';
import ProtectedRoute from './auth';

function App() {
  return (
    <Router>
      <div className="App">
      
        <main>
          <Routes>
           
            <Route
              path="/"element={< LoginSignup/>}
            />
       
            <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            } 
        />
            </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
