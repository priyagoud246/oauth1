import { useEffect, useState } from "react";
import axios from "axios"; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    
    axios.get("http://localhost:5000/auth/me", { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch(err => {
        console.error("Not authenticated", err);
        setError(true);
        // If the backend says no, go back to login
        window.location.href = "/";
      });
  }, []);

  if (error) return <div style={styles.container}><h1>Redirecting to Login...</h1></div>;
  if (!user) return <div style={styles.container}><h1>Loading Priyanka's Dashboard...</h1></div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome {user.displayName}</h1>
      <p style={styles.subText}>You have successfully logged in with Google</p>

      <div style={styles.card}>
        {/* Profile Image if you want to show it */}
        {user.image && <img src={user.image} alt="profile" style={styles.avatar} />}
        
        <div style={styles.infoRow}><strong>Name:</strong> {user.displayName}</div>
        <div style={styles.infoRow}><strong>Email:</strong> {user.email}</div>
        <div style={styles.infoRow}><strong>Google ID:</strong> {user.googleId}</div>
        
        <button 
          onClick={() => window.location.href = "http://localhost:5000/auth/logout"}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    minHeight: '100vh',
    backgroundColor: '#f4f7f9',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  heading: {
    fontSize: '2rem',
    color: '#1a73e8',
    marginBottom: '8px',
    fontWeight: '600',
  },
  subText: {
    fontSize: '1.1rem',
    color: '#5f6368',
    marginBottom: '32px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '450px',
    borderLeft: '5px solid #1a73e8',
    textAlign: 'center', // Centered for the profile look
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '2px solid #1a73e8',
  },
  infoRow: {
    marginBottom: '15px',
    fontSize: '1rem',
    color: '#3c4043',
    borderBottom: '1px solid #f1f3f4',
    paddingBottom: '10px',
    textAlign: 'left',
  },
  logoutBtn: {
    marginTop: '20px',
    backgroundColor: '#d93025',
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    width: '100%'
  }
};