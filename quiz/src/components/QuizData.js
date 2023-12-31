import React, { useEffect,useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function QuizData() {
  const [quizContent, setQuizContent] = useState('');
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('객관식');
  const [difficulty, setDifficulty] = useState(2);
  const [quizCount, setQuizCount] = useState(1);
  const { authInfo,updateAuthInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // authInfo.accessToken이 빈 문자열이면 로그인 페이지로 리디렉션
    if (!authInfo.accessToken) {
      alert("로그인이 필요합니다");
      navigate('/login');
    }
  }, [authInfo.accessToken, navigate]); 

  // 최대 퀴즈 개수 계산
  const maxQuizCount = quizContent.length > 2000 ? 5 : quizContent.length > 1000 ? 4 : 3;
  const navigateToLogin = () =>{
    updateAuthInfo({ name: '', accessToken: '', categories: [] });
    navigate('/login');
  }
  const handleQuizContentChange = (event) => {
    setQuizContent(event.target.value);
    // 입력된 글자 수에 따라 quizCount 최대 값을 조정
    if (quizCount > maxQuizCount) {
      setQuizCount(maxQuizCount);
    }
  };
  const navigateToQG = () => {
    navigate('/QuizData');
  };
  const navigateToQS = () => {
    navigate('/QuizSpace');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuizCountChange = (event) => {
    setQuizCount(event.target.value);
  };

  const handleCreateQuiz = async () => {
    if (quizContent.length <= 500 || quizContent.length >= 2000) {
      alert('퀴즈 내용은 500글자 이상, 2000글자 이하이어야 합니다.');
      return;
    }
    // 로딩 상태 시작
  setIsLoading(true);

    let prompt;
  if (questionType === '주관식') {
    prompt = `Please create ${quizCount} subjective questions based on the following format: Q#(# is number).""" \\nA#(# is number).""" \\n Difficulty: ${difficultyLevels[difficulty-1]}\\n${quizContent}`;
  } else if (questionType === '객관식') {
    prompt = `Please create ${quizCount} problems based on the following. Each question must have four options and the correct answer is one of them. The problem starts with Q.(ex. Q#(# is number). Problem a, b, c, d(where a, b, c, d are options) The answer to the question is indicated by A.(ex. A#(# is number). a) Difficulty: ${difficultyLevels[difficulty -1]}\\n The content of the question is as follows:\\n “${quizContent}”\\n Note: Make sure the problem is in multiple-choice form 
    `;
      ;
  }
  
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions",
        
        {
          model: "gpt-3.5-turbo", // 사용할 모델
          messages: [
            {
              role: 'user', // 또는 'system'을 사용할 수도 있습니다
              content: prompt
            }
          ],
          // max_tokens: 1000, // 응답의 길이 제한
        },
        {headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      const data = response.data;
      const text = data.choices[0].message.content.trim();
      const regex = /Q(\d+)\.(.*?)A\1\.(.*?)(?=(Q\d+\.|A\d+\.|$))/gs;
      const quizzes = [];
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      quizzes.push({
        question: match[2].trim(),
        answer: match[3].trim(),
      });
    }
      
      alert('퀴즈가 생성되었습니다!');
      try {
        const quizData = {
          inputText: quizContent,
          difficulty: difficulty,
          type: questionType,
          dataTitle: title,
          quizNum: quizCount,
          quizzes: quizzes.map(quiz => ({ quizText: quiz.question, quizAnswer: quiz.answer }))
        };
    
        const response = await axios.post('/data', quizData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authInfo.accessToken}` // 토큰 추가
          }
        });
    
        // 서버 응답 처리
        console.log('서버 응답:', response.data);
        // 다음 단계 또는 성공 메시지 표시 등
    
      } catch (error) {
        console.error('데이터 전송 중 오류 발생:', error);
        // 에러 처리 (예: 에러 메시지 표시)
      }
      // navigate('/QuizSet', { state: { generatedQuizzes: data.choices.map(choice => choice.text).join("\n\n") }});
      navigate('/QuizSet', { state: { generatedQuizzes: quizzes } });
    } catch (error) {
      console.error('GPT API 호출 중 오류 발생:', error);
      alert('퀴즈 생성에 실패했습니다.');
    }
    finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

 
  const renderCreateQuizButton = () => {
   
    return (
      <button
        onClick={handleCreateQuiz}
        style={buttonStyle}
      >
        Quiz 생성
      </button>
    );
  };

  

  // Define the difficulty levels
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  // Number of Quizzes 입력란과 텍스트 추가
  const quizCountInputSection = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="number"
        min="1"
        max={maxQuizCount} // 계산된 최대 퀴즈 개수로 설정
        value={quizCount}
        onChange={handleQuizCountChange}
        placeholder="Number of Quizzes"
        style={inputStyle}
      />
      <span style={{ marginLeft: '10px' }}>퀴즈 최대 갯수: {maxQuizCount}</span>
    </div>
  );

  const renderLoadingScreen = () => {
    if (isLoading) {
      return (
        <div style={loadingScreenStyle}>
          {/* 로딩 표시 (예: 스피너, 로딩 메시지 등) */}
          <p style={{ fontSize: '24px', color: '#FF9800',fontWeight: 'bold', }}>문제 생성중...</p>
        </div>
      );
    }
    return null;
  };

  const loadingScreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    zIndex:300
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

  const mainContainerStyle = {
    position: 'relative', // 상대 위치
    height: '100vh', // 전체 높이
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
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
    borderRadius: '100px', // 둥근 모서리
    padding: '20px',
    width: '40%', // 너비 70%
    height: '55%',
    position: 'absolute', // 절대 위치
    top: '30%', // 상단으로부터 50% 위치에 배치
    left: '50%', // 좌우 가운데 정렬을 위해 왼쪽에서 50% 위치
    transform: 'translateX(-50%)', // X축과 Y축 기준으로 -50% 이동하여 가운데 정렬
    maxWidth: '1200px', // 최대 너비 설정
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1, // 주황색 배경 위에 위치
    overflow: 'hidden', // 내용이 넘치지 않도록 설정
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가

  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // 아이템 사이에 균등한 간격을 줌
    height: '100%', // 부모 요소의 높이를 꽉 채움
    width: '100%', // 부모 요소의 폭을 꽉 채움
    marginLeft: '20px',

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
      {renderLoadingScreen()}
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
      }}>SEQuizGenerator</h1>
      <div style={contentContainerStyle}>
        {/* 퀴즈 내용 입력란과 폼 요소들 */}
        <textarea
          value={quizContent}
          onChange={handleQuizContentChange}
          placeholder="   Enter quiz content here..."
          style={{ ...inputStyle, height: '100%', resize: 'none' }}
        />
        <div style={formStyle}>
          <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" style={inputStyle} />
          <select value={questionType} onChange={handleQuestionTypeChange} style={inputStyle}>
            <option value="객관식">객관식</option>
            <option value="주관식">주관식</option>
          </select>
          <div style={{ width: '100%', padding: '0', boxSizing: 'border-box' }}>
            <label htmlFor="difficulty" style={{ width: '100%', }}></label>
            <input
              id="difficulty"
              type="range"
              min="1"
              max="3"
              value={difficulty}
              onChange={handleDifficultyChange}
              style={{ width: '100%', margin: '10px 0', }}
            />
            <span>난이도 : {difficultyLevels[difficulty - 1]}</span>
          </div>
          {quizCountInputSection}
          {renderCreateQuizButton()}
          
          
          </div>
      
      </div>
    </div>
  );
}


const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '50px',
  border: '1px solid #ddd',
  width: 'calc(100% - 40px)', // 전체 폭에서 padding 값을 빼줌
  boxSizing: 'border-box', // border와 padding이 width에 포함되도록 설정


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


};


export default QuizData;