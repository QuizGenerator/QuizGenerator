import React, { useState } from 'react';

function SEQuizGenerator() {
  const [quizContent, setQuizContent] = useState('');
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [difficulty, setDifficulty] = useState(2); // 1 = Hard, 2 = Medium, 3 = Easy
  const [quizCount, setQuizCount] = useState(1);

  const handleQuizContentChange = (event) => {
    setQuizContent(event.target.value);
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

  const handleCreateQuiz = () => {
    // Logic to handle quiz creation
    alert('Quiz Created!');
  };

  // Define the difficulty levels
  const difficultyLevels = ['Hard', 'Medium', 'Easy'];

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
    width: '65%', // 너비 65%
    height: '70%', // 높이 40%
    backgroundColor: '#FFC107', // 주황색 배경
    borderRadius: '100px', // 둥근 모서리
    zIndex: -1, // 내용 뒤에 위치
  };

  const contentContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '100px', // 둥근 모서리
    padding: '20px',
    width: '50%', // 너비 70%
    height: '65%', // 높이 45%
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
        <div style={{ width: '100%' }}>
          <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" style={inputStyle} />
          <select value={questionType} onChange={handleQuestionTypeChange} style={inputStyle}>
            <option value="multiple-choice">객관식</option>
            <option value="short-answer">주관식</option>
          </select>
          <div style={{ ...inputStyle, padding: '0' }}>
            <label style={{ width: '100%' }}>
              Difficulty:
              <input
                type="range"
                min="1"
                max="3"
                value={difficulty}
                onChange={handleDifficultyChange}
                style={{ width: '100%', margin: '10px 0' }}
              />
            </label>
          </div>
          <input
            type="number"
            min="1"
            max={Math.floor(quizContent.length / 50) || 1}
            value={quizCount}
            onChange={handleQuizCountChange}
            placeholder="Number of Quizzes"
            style={inputStyle}
          />
          <button onClick={handleCreateQuiz} style={buttonStyle}>
            Quiz 생성
          </button>
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
  width: '100%',
};

export default SEQuizGenerator;
