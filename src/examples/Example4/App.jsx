/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

// Home Component: Displays the main home page and navigation links
const Home = ({ setAuthenticated }) => {
  const navigate = useNavigate(); // Allows navigation programmatically

  const handleLogout = () => {
    setAuthenticated(false); // Log out the user
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        {/* Navigation links to Home and Dashboard */}
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |{' '}
        <button onClick={handleLogout}>Log Out</button>
      </nav>
    </div>
  );
};

// Dashboard Component: A placeholder for a private page
const Dashboard = () => <h1>Dashboard (Private)</h1>;

// Login Component: Displays the login page and redirects after login
const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate(); // Allows navigation programmatically
  const location = useLocation(); // Access the current location
  const from = location.state?.from?.pathname || '/'; // The route the user tried to access

  const handleLogin = () => {
    setAuthenticated(true); // Log in the user
    navigate(from); // Redirect to the intended route or home
  };

  return (
    <div>
      <h1>Login Page</h1>
      {/* Display the route the user was trying to access */}
      <p>You must log in to view the page at {from}</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

// Custom PrivateRoute Component: Protects routes that require authentication
const PrivateRoute = ({ isAuthenticated, children }) => {
  const location = useLocation(); // Access the current location

  return isAuthenticated ? (
    children // If authenticated, render the protected content
  ) : (
    // Otherwise, redirect to the login page and save the current location
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// App Component: Main application entry point with routes and authentication state
const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false); // Track authentication state

  return (
    <Router>
      <Routes>
        {/* Public route: Home */}
        <Route
          path="/"
          element={<Home setAuthenticated={setAuthenticated} />}
        />
        {/* Private route: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Public route: Login */}
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
