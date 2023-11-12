import React, { useState } from 'react';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', id, password);
  };

  return (
    <div style={{ background: '#FFC107', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', width: 300, boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#FF9800', textAlign: 'center' }}>SEQuizGenerator</div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="id" style={{ display: 'block', textAlign: 'left', marginBottom: 5 }}>ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ width: '100%', padding: '10px', display: 'block', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="password" style={{ display: 'block', textAlign: 'left', marginBottom: 5 }}>PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', display: 'block', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        <button onClick={handleLogin} style={{ background: '#FF9800', color: 'white', padding: '10px', borderRadius: 4, border: 'none', fontWeight: 'bold', width: '100%', boxSizing: 'border-box', marginBottom: 10 }}>
          LOGIN
        </button>
        <button style={{ background: 'transparent', color: '#FF9800', padding: '10px', borderRadius: 4, border: '1px solid #FF9800', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
