import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      
      
      setUser(null);
      
      
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>OAuth App</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            
            {/* Show User's Name if available */}
            <span style={styles.userName}>{user.displayName}</span>
            
            <button 
              onClick={logout} 
              style={styles.logoutBtn}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9d2ce'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fce8e6'}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a73e8',
    margin: 0,
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  link: {
    textDecoration: 'none',
    color: '#3c4043',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#5f6368',
  },
  logoutBtn: {
    backgroundColor: '#fce8e6',
    color: '#d93025',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  loginBtn: {
    textDecoration: 'none',
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    padding: '8px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
  }
};