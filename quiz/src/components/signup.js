import React, { useState } from 'react';

function SignUpPage() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Sign-up logic goes here
    console.log('Signing up with:', id, name, password, confirmPassword);
  };

  const checkDuplicateId = () => {
    // Logic for checking duplicate IDs goes here
    console.log('Checking ID for duplicates:', id);
  };

  return (
    <div style={{ background: '#FFC107', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', width: '300px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#FF9800', textAlign: 'center' }}>SEQuizGenerator</div>
        
        {/* ID input with duplicate check */}
        <div style={{ marginBottom: 10, position: 'relative' }}>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            style={{ width: '100%', padding: '10px', paddingRight: '85px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <button onClick={checkDuplicateId} style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '5px', 
            transform: 'translateY(-50%)', 
            padding: '6px 12px', 
            borderRadius: 4, 
            border: '1px solid #ddd', 
            backgroundColor: '#e0e0e0', 
            color: 'black', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}>
            중복 확인
          </button>
        </div>

        {/* Name input */}
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        
        {/* Password input */}
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>

        {/* Confirm password input */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        
        {/* Signup button */}
        <button onClick={handleSignUp} style={{ 
          background: '#FF9800', 
          color: 'white', 
          padding: '10px', 
          borderRadius: 4, 
          border: 'none', 
          fontWeight: 'bold', 
          width: '100%', 
          boxSizing: 'border-box', 
          cursor: 'pointer' 
        }}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
