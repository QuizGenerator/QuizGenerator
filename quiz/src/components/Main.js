import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ background: '#FFC107', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 8, display: 'flex', flexDirection: 'column', width: 300 }}>
        <div style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#FF9800' }}>SEQizGenerator</div>
        <button onClick={navigateToLogin} style={{ background: '#FF9800', color: 'white', padding: 10, borderRadius: 4, border: 'none', fontWeight: 'bold', marginBottom: 8 }}>
          LOGIN
        </button>
        <button onClick={navigateToSignup} style={{ background: 'transparent', color: '#FF9800', padding: 10, borderRadius: 4, border: '1px solid #FF9800', fontWeight: 'bold' }}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default MainPage;
