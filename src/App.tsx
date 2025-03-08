import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AlertProvider } from "./contexts/AlertContext";
import { useAlert } from "./contexts/AlertContext";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // List of routes that should have full-screen layout (no header/footer)
  const fullScreenRoutes = [
    "/dashboard",
    "/auth",
    "/not-found",
    "/unauthorized",
  ];

  // Check if the current route is a full-screen route
  const isFullScreen = fullScreenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      {!isFullScreen && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isFullScreen && <Footer />}
    </div>
  );
}

function AlertContainer() {
  const { alerts, hideAlert } = useAlert();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => hideAlert(alert.id)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <Router>
          <AppContent />
          <AlertContainer />
        </Router>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
