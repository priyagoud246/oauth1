import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use withCredentials to ensure the session cookie is sent to the backend
        const res = await axios.get("http://localhost:5000/auth/me", { 
          withCredentials: true 
        });

        // FIX: Check if data exists. If backend sends { success: true, user: {...} }
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          // If backend sends the user object directly: res.data
          setUser(res.data);
        }
      } catch (error) {
        // This catch handles the 401 Unauthorized quietly
        console.log("Status: Visitor mode (Not logged in)");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      {/* Navbar stays outside Routes to persist on all pages */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;