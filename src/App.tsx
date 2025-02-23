import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AlertProvider } from "./contexts/AlertContext";
import { useAlert } from "./contexts/AlertContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import Auth from "./pages/Auth";
import Alert from "./components/Alert";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";


function AppContent() {
  const location = useLocation();

  const fullScreenPages = ["dashboard", "auth", "not-found", "unauthorized"];

  function isFullScreen(path: string) {
    return fullScreenPages.includes(path);
  }

  return (
    <>
      {!isFullScreen(location.pathname.split("/")[1]) && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullScreen(location.pathname.split("/")[1]) && <Footer />}
    </>
  );
}

function AlertContainer() {
  const { alerts, hideAlert } = useAlert();

  return (
    <>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => hideAlert(alert.id)}
        />
      ))}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AlertContainer />
        <Router>
          <AppContent />
        </Router>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
