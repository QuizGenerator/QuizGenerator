import React, { useEffect,useState,useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function QuizSet() {
  const location = useLocation();
  const { generatedQuizzes } = location.state || [];
  const [showAnswers, setShowAnswers] = useState(false);
  const { authInfo,updateAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCheckAnswer = () => {
    setShowAnswers(!showAnswers);
  }

  const navigateToQG = () => {
    navigate('/QuizData');
  };

  useEffect(() => {
    // authInfo.accessToken이 빈 문자열이면 로그인 페이지로 리디렉션
    if (!authInfo.accessToken) {
      alert("로그인이 필요합니다");
      navigate('/login');
    }
  }, [authInfo.accessToken, navigate]); 
  
  const mainContainerStyle = {
    position: 'relative', // 상대 위치
    height: '100vh', // 전체 높이
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };
  const navigateToLogin = () =>{
    updateAuthInfo({ name: '', accessToken: '', categories: [] });
    navigate('/login');
  }

  const navigateToQGBtnStyle = {
    // 배치
    position: 'absolute',
    top: 0, // 좌측에 위치
    left: 0, // 좌측에 위치
    padding: '20px',
    display: 'flex',
    zIndex: 10, // orangeShapeStyle 위에 위치
    // 디자인
    background: 'transparent',
    color: '#FF9800',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: '50px'
  };
  const orangeShapeStyle = {
    position: 'absolute', // 절대 위치
    top: '10%', // 상단으로부터 20% 떨어짐
    left: '50%', // 좌우 가운데 정렬을 위해 왼쪽에서 50% 위치
    transform: 'translateX(-50%)', // X축 기준으로 -50% 이동하여 가운데 정렬
    width: '65%', // 너비 65%
    height: '85%', // 높이 40%
    backgroundColor: '#FFC107', // 주황색 배경
    borderRadius: '100px', // 둥근 모서리
    zIndex: -1, // 내용 뒤에 위치
  };
  const topRightContainerStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 10 // 다른 요소들 위에 위치
  };
  const welcomeTextStyle = {
    marginRight: '10px',
    fontSize: '20px',
    color: 'black'
  };
  const logoutButtonStyle = {
    background: '#FF9800',
    color: 'white',
    padding: '5px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  const navigateToQS = () => {
    navigate('/QuizSpace');
  };
  const QSButtonStyle = {
    background: 'white',
    color: '#FF9800',
    padding: '5px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  const contentContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '100px', // 둥근 모서리
    padding: '20px',
    width: '40%', // 너비 70%
    height: '62.5%',
    position: 'absolute', // 절대 위치
    top: '23%', // 상단으로부터 50% 위치에 배치
    left: '50%', // 좌우 가운데 정렬을 위해 왼쪽에서 50% 위치
    transform: 'translateX(-50%)', // X축과 Y축 기준으로 -50% 이동하여 가운데 정렬
    maxWidth: '1200px', // 최대 너비 설정
    display: 'flex',
  flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1, // 주황색 배경 위에 위치
    overflow: 'auto', // 내용이 넘치지 않도록 설정
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가

  };
  return (
    <div style={mainContainerStyle}>
      <button onClick={navigateToQG} style={navigateToQGBtnStyle}>
        QG
      </button>
      <div style={orangeShapeStyle}></div>
      <div style={topRightContainerStyle}>
        <div style={welcomeTextStyle}>{authInfo.name}님 환영합니다.</div>
        <button onClick={navigateToLogin} style={logoutButtonStyle}>로그아웃</button>
        <button onClick={navigateToQS} style={QSButtonStyle}>Quiz Space</button>
      </div>
      <h1 style={{
        position: 'absolute',
        top: '13%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>생성된 퀴즈</h1>
      <div style={contentContainerStyle}>
        {generatedQuizzes.map((quiz, index) => (
          <div key={index}>
            <h3>문제 {index + 1}: {quiz.question}</h3>
            <p style={{ visibility: showAnswers ? 'visible' : 'hidden' }}>
        정답: {quiz.answer}
      </p>
          </div>
        ))}
        <button onClick={handleCheckAnswer} style={buttonStyle}>
        {showAnswers ? '정답 숨기기' : '정답 확인'}
      </button>
      </div>
      
    </div>
  );
}

// 스타일은 이전과 동일하게 유지
const buttonStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#FF9800',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '50%',
  alignSelf: 'center',
  marginTop: 'auto',
};

export default QuizSet;
