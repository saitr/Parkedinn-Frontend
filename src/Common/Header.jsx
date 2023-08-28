import React,{useEffect, useState} from "react";
import {
  Link,
  useLocation
} from "react-router-dom";
import axiosInstance from '../axios'; // Make sure to import your axios instance
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Import the JWT decode library

function Header({isAuthenticated}) {

  const navigate = useNavigate();
const location = useLocation();

  const [isSuperUser, setIsSuperUser] = useState(null); // Use null as the initial value
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const decodedToken = jwt_decode(accessToken);
    const loggedInUserId = decodedToken.user_id;
    axiosInstance.get('user_list/').then(response => {
      const loggedInUser = response.data.find(user => user.id === loggedInUserId);
      setIsSuperUser(loggedInUser && loggedInUser.is_superuser);
    });
  }, []);



  const handleLogout = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
  
    if (!refresh_token) {
      alert('You are already logged out')
      navigate('/login')
      return;
    }
  
    try {
      const refreshResponse = await axiosInstance.post('/token/refresh/', { refresh: refresh_token });
      const new_access_token = refreshResponse.data.access;
  
      // Use the refreshed access token for authentication
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + new_access_token;
  
      // Continue with the logout process
      await axiosInstance.post('/logout/', { refresh_token });
  
      // Clear tokens and navigate to login page
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    } catch (error) {
      alert(error)
      console.error(error);
    }
  };
const shouldDisplayLogout = location.pathname !== '/register' && location.pathname !== '/login';
  
  return (
    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
            <Link class="navbar-brand" to="/">
              <span>ParkedInn</span>
            </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse ml-auto"
            id="navbarSupportedContent">
            <div class="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul class="navbar-nav  ">
                <li class="nav-item active">
                  {/* <a class="nav-link" href="/">Home</a> */}
                  <Link class="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  {/* <a class="nav-link" href="/about"> About Us</a> */}
                  <Link class="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li class="nav-item">
                  {/* <a class="nav-link" href="/features"> Features </a> */}
                  <Link class="nav-link" to="/features">
                    Features
                  </Link>
                </li>
                {isSuperUser ? (
                  <li class="nav-item">
                    <Link class="nav-link" to="/total_bookings">
                      Total Bookings
                    </Link>
                  </li>
                ) : (
                  <li class="nav-item">
                    <Link class="nav-link" to="/user_billing">
                      My Bookings
                    </Link>
                  </li>
                )}
                
                <li class="nav-item">
                  {/* <a class="nav-link" href="/contact">Contact us</a> */}
                  <Link class="nav-link" to="/contact">
                    Contact us
                  </Link>
                </li>
                {shouldDisplayLogout && (
                  <li className="nav-item">
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }} className="nav-link">Logout</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;


