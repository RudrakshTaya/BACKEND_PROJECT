import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import LoginSignup from './pages/LoginSignup/loginsignup';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddCard from './pages/Menu/AddCard';
import UpdateCard from './pages/Menu/UpdateCard';
import CardDetail from './pages/Menu/MenuDetail';
import ReviewPage from './pages/ReviewPage';  // Ensure the path is correct
import Cart from './pages/cart';
import ConfirmationPage from './pages/confirm';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }

    if (location.pathname === '/login') {
      document.body.classList.add('login-page');
    } else {
      document.body.classList.remove('login-page');
    }
  }, [location]);

  return (
    <div>
      {isLoggedIn && (
        <Navbar expand='lg' className='bg-body-tertiary shadow'>
          <Container className="d-flex flex-row justify-space-between align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', color: 'white' }}>
            <Navbar.Brand>
              <Link to='/' className='navbar-brand text-success d-flex align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-r-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.335V8.924H8.52L9.98 12h1.52L9.856 8.701c.828-.299 1.495-1.101 1.495-2.238 0-1.488-1.03-2.461-2.74-2.461H5.5Zm1.335 1.09v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z"/>
                </svg>
                <span className='mx-2 lh-1 fw-semibold'>
                  4'R
                  <br />
                  Restaurant
                </span>
              </Link>
            </Navbar.Brand>
            <div className="d-flex align-items-center">
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav' className="ms-3">
                <Nav className='d-flex flex-row'>
                  <Link to='/' className='nav-link active text-uppercase'>Home</Link>
                  <Link to='/menu' className='nav-link text-uppercase'>Menu</Link>
                  
                  <Link to='/contact' className='nav-link text-uppercase'>Contact</Link>
                  <Link to='/reviews' className='nav-link text-uppercase'>Reviews</Link> {/* Added link to ReviewPage */}
                  <Link to ='/cart' className='nav-link text-uppercase'> Cart</Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      )}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate to="/login" replace />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" replace />} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/contact" replace />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/update-card/:cardId" element={<UpdateCard />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/cards/:cardId" element={<CardDetail />} /> {/* Card detail route */}
        <Route path ="/cart" element={<Cart/>}/>
        <Route path="/reviews" element={isLoggedIn ? <ReviewPage /> : <Navigate to="/login" replace />} /> {/* Added route for ReviewPage */}
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
