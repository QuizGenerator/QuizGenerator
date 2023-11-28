import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function QuizSet() {
  const location = useLocation();
  const { generatedQuizzes } = location.state || [];
  const [showAnswers, setShowAnswers] = useState(false);

  const handleCheckAnswer = () => {
    setShowAnswers(!showAnswers);
  }

  return (
    <div>
      <h1>생성된 퀴즈</h1>
      <div>
        {generatedQuizzes.map((quiz, index) => (
          <div key={index}>
            <h3>문제 {index + 1}: {quiz.question}</h3>
            {showAnswers && <p>정답: {quiz.answer}</p>}
          </div>
        ))}
      </div>
      <button onClick={handleCheckAnswer} style={buttonStyle}>
        {showAnswers ? '정답 숨기기' : '정답 확인'}
      </button>
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
};

export default QuizSet;
