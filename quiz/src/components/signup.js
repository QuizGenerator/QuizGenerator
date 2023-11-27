import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isIdChecked) {
      console.log('ID 중복 확인이 필요합니다.');
      return;
    }
  
    axios.post('auth/signup', { account, password, name })
      .then(response => {
        if (response.data === true) {
          alert('회원가입 성공');
          navigateTologin();
        } else {
          alert('회원가입 실패');
        }
      })
      .catch(error => {
        console.error('회원가입 중 에러 발생:', error);
        alert('회원가입중 에러 발생');
      });
  };

  const checkDuplicateId = () => {
    axios.get(`auth/check/${account}`)
      .then(response => {
        console.log('응답:', response.data);
        if (response.data === true) {
          alert('ID가 중복됩니다.'); 
          setIsIdChecked(false);
        } else {
          alert('사용 가능한 ID입니다.');
          setIsIdChecked(true);
        }
      })
      .catch(error => {
        console.error('ID 중복 확인 중 에러 발생:', error);
        if (error.response && error.response.status === 404) {
          alert('ID 사용이 가능합니다.');
          setIsIdChecked(true);
        } else {
          alert('ID 중복 확인 중 문제가 발생했습니다.');
          setIsIdChecked(false);
        }
      });
  };
  
  
  const navigateTologin = () => {
    navigate('/login');
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
            value={account}
            onChange={(e) => setAccount(e.target.value)}
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
