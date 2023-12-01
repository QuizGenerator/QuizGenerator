import React, { useState , useContext, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';


function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateAuthInfo } = useContext(AuthContext);
  useEffect(() => {
    updateAuthInfo({ name: '', accessToken: '', categories: [] });
  }, []);

  const handleLogin = () => {
    console.log("login clicked");
    axios.post('/auth/signin', { account, password })
      .then(response => {
        console.log('로그인 성공:', typeof response.data);
        // 응답 헤더에서 JWT 토큰 추출
        const accessToken = response.headers['accesstoken'];
        const newAuthInfo = {
          name: response.data.name,
          accessToken: accessToken,
          categories: response.data.returnCategories
        };
        updateAuthInfo(newAuthInfo);
        // 로그인 성공 후 처리 (예: JWT 토큰 저장, 페이지 리디렉션)
        navigate('/QuizData');
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        // 에러 처리 (예: 에러 메시지 표시)
      });}
      const navigateToSignup = () => {
        navigate('/signup');
      };

  return (
    
    <div style={{ background: '#FFC107', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', width: 300, boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#FF9800', textAlign: 'center' }}>SEQuizGenerator</div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="id" style={{ display: 'block', textAlign: 'left', marginBottom: 5 }}>ID</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
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
        <button onClick={navigateToSignup}style={{ background: 'transparent', color: '#FF9800', padding: '10px', borderRadius: 4, border: '1px solid #FF9800', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
