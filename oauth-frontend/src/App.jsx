import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// 1. GLOBAL AXIOS CONFIG: Essential for sending cookies to Render
axios.defaults.withCredentials = true;

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use the Netlify variable, or fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // GET request to backend to check if session exists
        const res = await axios.get(`${API_BASE_URL}/auth/me`);

        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(res.data);
        }
      } catch (error) {
        console.log("Status: Visitor mode (Not logged in)");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [API_BASE_URL]);

  // Global loading screen while fetching auth status
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
          
            <ProtectedRoute user={user} loading={loading}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;