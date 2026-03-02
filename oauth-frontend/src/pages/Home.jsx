import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to  OAuth App</h1>

        <p style={styles.text}>
          A full-stack application demonstrating <strong>Google OAuth 2.0</strong>, 
          Session-based authentication, and protected routes using 
          <strong> React, Express, and MongoDB</strong>.
        </p>

        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.primaryBtn}>
            Get Started
          </Link>
          <a 
            href="https://github.com/priyagoud246" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.secondaryBtn}
          >
            View GitHub
          </a>
        </div>
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
    height: '90vh', // Slightly less than 100 to account for Navbar
    backgroundColor: '#f8f9fa',
    fontFamily: "'Inter', -apple-system, sans-serif",
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '50px 40px',
    borderRadius: '24px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
    maxWidth: '700px',
    width: '90%',
  },
  heading: {
    fontSize: '2.8rem',
    color: '#1a73e8', // Theme Blue
    marginBottom: '20px',
    fontWeight: '800',
    letterSpacing: '-1px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#5f6368',
    lineHeight: '1.7',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: '#f1f3f4',
    color: '#3c4043',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  }
};