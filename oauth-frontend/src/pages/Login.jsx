export default function Login() {
  // Use the Netlify variable, or fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleLogin = () => {
    // Redirects the user to the DYNAMIC backend OAuth route
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome Back</h1>

        <p style={styles.text}>
          Please login using your Google account to access the dashboard.
        </p>

        <button
          style={styles.googleBtn}
          onClick={handleLogin}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          <img 
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
            alt="Google Logo" 
            style={styles.icon} 
          />
          <span>Sign in with Google</span>
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
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5', 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  heading: {
    color: '#1a73e8', 
    marginBottom: '16px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  text: {
    color: '#5f6368',
    marginBottom: '24px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px', 
    backgroundColor: '#ffffff',
    color: '#3c4043',
    border: '1px solid #dadce0',
    padding: '12px 24px',
    borderRadius: '8px', 
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    width: '100%',
  },
  icon: {
    width: '20px',
    height: '20px',
  }
};