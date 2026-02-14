import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lectures from './pages/Lectures';
import Courses from './pages/Courses';
import Projects from './pages/Projects';
import Activities from './pages/Activities';
import Executives from './pages/Executives';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminAccess from './pages/AdminAccess';
import Dashboard from './pages/Dashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Hidden Admin Routes - Not visible in public navigation */}
      <Route path="/admin-access-portal" element={<AdminAccess />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Admin Dashboard - Protected Route */}
      <Route
        path="/dashboard/*"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lectures" element={<Lectures />} />
        <Route path="courses" element={<Courses />} />
        <Route path="projects" element={<Projects />} />
        <Route path="activities" element={<Activities />} />
        <Route path="executives" element={<Executives />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
