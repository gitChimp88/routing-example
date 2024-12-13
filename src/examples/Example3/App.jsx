import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

// Home Component: Displays the home page with a button to navigate to the About page
const Home = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  return (
    <div>
      <h1>Home Page</h1>
      {/* Button to navigate to the About page */}
      <button onClick={() => navigate('/about')}>Go to About Page</button>
    </div>
  );
};

// About Component: Displays the about page with a button to navigate back to the Home page
const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About Page</h1>
      {/* Button to navigate back to the Home page */}
      <button onClick={() => navigate('/')}>Go to Home Page</button>
    </div>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404: Page not found</h1>
      <button onClick={() => navigate('/')}>Go to Home Page</button>
    </div>
  );
};

// App Component: Defines the main application structure and routes
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
