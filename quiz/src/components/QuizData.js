import React, { useState } from 'react';

function QuizData() {
  const [quizContent, setQuizContent] = useState('');
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [difficulty, setDifficulty] = useState(2);
  const [quizCount, setQuizCount] = useState(1);
  const [generatedQuizzes, setGeneratedQuizzes] = useState('');
  const [showModal, setShowModal] = useState(false); 
  // 최대 퀴즈 개수 계산
  const maxQuizCount = quizContent.length > 2000 ? 5 : quizContent.length > 1000 ? 4 : 3;

  const handleQuizContentChange = (event) => {
    setQuizContent(event.target.value);
    // 입력된 글자 수에 따라 quizCount 최대 값을 조정
    if (quizCount > maxQuizCount) {
      setQuizCount(maxQuizCount);
    }
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
    const prompt = `다음 내용을 바탕으로 ${quizCount}개의 ${questionType === 'multiple-choice' ? '객관식' : '주관식'} 
                    문제를 생성하세요:\n난이도: ${difficultyLevels[difficulty - 1]}\n${quizContent}`;
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 환경 변수나 다른 방법으로 API 키를 안전하게 관리하세요
          "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003", // 사용할 모델
          prompt: prompt,
          max_tokens: 1000, // 응답의 길이 제한
        }),
      });
  
      const data = await response.json();
      setGeneratedQuizzes(data.choices.map(choice => choice.text).join("\n\n"));
      setShowModal(true);
      alert('퀴즈가 생성되었습니다!');
    } catch (error) {
      console.error('GPT API 호출 중 오류 발생:', error);
      alert('퀴즈 생성에 실패했습니다.');
    }
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 모달 컴포넌트
  const Modal = ({ onClose, children }) => (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>닫기</button>
        {children}
      </div>
    </div>
  );
  

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
    top: '15%', // 상단으로부터 20% 떨어짐
    left: '50%', // 좌우 가운데 정렬을 위해 왼쪽에서 50% 위치
    transform: 'translateX(-50%)', // X축 기준으로 -50% 이동하여 가운데 정렬
    width: '55%', // 너비 65%
    height: '60%', // 높이 40%
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

  return (
    <div style={mainContainerStyle}>
      <div style={orangeShapeStyle}></div>
      <h1 style={{
        position: 'absolute',
        top: '20%',
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
            <option value="multiple-choice">객관식</option>
            <option value="short-answer">주관식</option>
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
          <button onClick={handleCreateQuiz} style={buttonStyle}>
            Quiz 생성
          </button>
          </div>
      {/* 생성된 퀴즈 표시 */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>생성된 퀴즈:</h2>
          <div>{generatedQuizzes}</div>
        </Modal>
      )}
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

// ... 기존 스타일 정의 및 추가 모달 스타일
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

export default QuizData;