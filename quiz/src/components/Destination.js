import React, { useContext, useEffect, useState } from 'react';
import { useParams , useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Destination = () => {
  const { dataId } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  
  const { authInfo,updateAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/quiz/${dataId}`, {
          headers: {
            "Authorization": `Bearer ${authInfo.accessToken}`
          }
        });
        console.log("faewfaew",response.data);
        setQuizDetails(response.data);
      } catch (error) {
        console.error('Quiz 상세 정보 가져오기 실패:', error);
      }
    };

    fetchData();
  }, [dataId, authInfo.accessToken]);

  const handleCheckAnswer = () => {
    setShowAnswers(!showAnswers);
  };
  const navigateToQG = () => {
    navigate('/QuizData');
  };
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
  const navigateToLogin = () =>{
    updateAuthInfo({ name: '', accessToken: '', categories: [] });
    navigate('/login');
  }
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
      }}>퀴즈 상세</h1>
      <div style={contentContainerStyle}>
        {quizDetails.map((quiz, index) => (
          <div key={index} style={quizItemStyle}>
            <h3>문제 {index + 1}: {quiz.quizText}</h3>
            <p style={{ visibility: showAnswers ? 'visible' : 'hidden' }}>
              정답: {quiz.quizAnswer}
            </p>
          </div>
        ))}
        <button onClick={handleCheckAnswer} style={buttonStyle}>
          {showAnswers ? '정답 숨기기' : '정답 확인'}
        </button>
      </div>
    </div>
  );
};

// Styles
const mainContainerStyle = {
  position: 'relative',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const headerStyle = {
  position: 'absolute',
  top: '13%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10
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

const contentContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '100px',
  padding: '20px',
  width: '40%',
  height: '62.5%',
  position: 'absolute',
  top: '23%',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  zIndex: 1,
  overflow: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};

const quizItemStyle = {
  marginBottom: '20px'
};

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

export default Destination;
