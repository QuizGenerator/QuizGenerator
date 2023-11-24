import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizItem = ({ title, difficulty, questionCount, questionType, date, onChangeCategory, onDelete }) => {
  // 난이도 라벨 정의
  const difficultyLabels = { 'Hard': '상', 'Medium': '중', 'Easy': '하' };

  const quizItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'white',
    margin: '5px 0',
    borderRadius: '5px',
    flexGrow: 1, // flex-grow 속성 추가
    whiteSpace: 'nowrap', // 줄바꿈 방지
  };
  const deleteBtnStyle = {
    border: 'none',
    background: 'black',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px'
  };

  const categoryChangeBtnStyle = {
    border: 'none',
    background: 'black',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px',
    marginRight: '5px'
  };

  return (
    <div style={quizItemStyle}>
      <div style={{ marginRight: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div>난이도: {difficultyLabels[difficulty]} | {questionCount}문제 | {questionType === 'multiple-choice' ? '객관식' : '주관식'}</div>
      </div>
      <div style={{ marginRight: '50px' }}>{date}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={onChangeCategory} style={categoryChangeBtnStyle}>
          카테고리 변경
        </button>
        <button onClick={onDelete} style={deleteBtnStyle}>
          삭제
        </button>
      </div>
    </div>
  );
};

const QuizSpace = () => {
  const navigate = useNavigate();

  const navigateToQG = () => {
    navigate('/QuizData');
  };

  const [activeTab, setActiveTab] = useState('미분류');
  const [quizzes, setQuizzes] = useState([
    {
      title: 'Data Title1',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    {
      title: 'Data Title2',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    {
      title: 'Data Title3',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    {
      title: 'Data Title4',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    {
      title: 'Data Title5',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    {
      title: 'Data Title5',
      difficulty: 'Hard',
      questionCount: 5,
      questionType: 'multiple-choice',
      date: '2023 10 23 18:07'
    },
    // ... 다른 퀴즈들
  ]);
  // 카테고리 관련 상태
  const [categories, setCategories] = useState(['미분류', '카테고리1', '카테고리2']);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // 카테고리 관리 모달을 여는 함수
  const openCategoryModal = () => {
    setShowCategoryModal(true);
  };


  const handleDelete = (quizTitle) => {
    setQuizzes(quizzes.filter(quiz => quiz.title !== quizTitle));
  };

  // 카테고리 변경 핸들러 (예시)
  const handleChangeCategory = (quizTitle) => {
    // 카테고리 변경 로직
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

  const logoutButtonStyle = {
    background: '#FF9800',
    color: 'white',
    padding: '5px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
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

  const tabAndButtonContainerStyle = {
    alignItems: 'center', // 세로 중앙 정렬
    maxWidth: '96%', // 컨테이너 최대 너비
    margin: '20px auto',
    marginBottom: '20px' // 하단 여백
  };


  const tabContainerStyle = {
    position: 'absolute', // 절대 위치
    display: 'flex',
    overflowX: 'auto', // 가로 스크롤 가능하게 설정
    maxWidth: '80%', // 너비 65%
    // margin: 'auto', // 가운데 정렬
    whiteSpace: 'nowrap', // 줄바꿈 X
  };

  const editCategoryButtonStyle = {
    whiteSpace: 'nowrap', // 줄바꿈 방지
    background: '#FF9800',
    color: 'white',
    padding: '5px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '490px',
    marginTop: '-100px' // 위쪽으로 10픽셀 이동
  };

  const quizContainerStyle = {
    maxHeight: '410px', // 컨테이너의 최대 높이 설정
    overflowY: 'auto', // 세로 스크롤 적용
    width: '100%', // 컨테이너의 너비 설정
    padding: '10px',
    background: '#FFC107',
    borderRadius: '5px',
    margin: 'auto'
  };

  const TabButton = ({ name, activeTab, setActiveTab }) => {
    return (
      <button
        style={{
          background: activeTab === name ? '#FFFF00' : 'transparent',
          border: '1px solid black', // 검은색 테두리 추가
          padding: '5px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '0 2px', // 버튼 간의 좌우 간격 추가
          whiteSpace: 'nowrap', // 줄바꿈 방지
          width: '90px'
        }}
        onClick={() => setActiveTab(name)}
      >
        {name}
      </button>
    );
  };

  return (
    <div style={mainContainerStyle}>
      <button onClick={navigateToQG} style={navigateToQGBtnStyle}>
        QG
      </button>
      <div style={orangeShapeStyle}></div>
      <div style={topRightContainerStyle}>
        <div style={welcomeTextStyle}>UserName님 환영합니다.</div>
        <button style={logoutButtonStyle}>로그아웃</button>
      </div>
      <h1 style={{ // 페이지표시(h1): "QuizSpace"
        position: 'absolute',
        top: '13%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>QuizSpace
        <div style={tabAndButtonContainerStyle}>
          <div style={tabContainerStyle}>
            <TabButton name='미분류' activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name='카테고리1' activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name='카테고리2' activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* More tabs... */}
          </div>
          <button onClick={openCategoryModal} style={editCategoryButtonStyle}>
            카테고리 관리
          </button>
        </div>
        {/* 카테고리 관리 모달 */}
        {showCategoryModal && (
          <div>
            {/* 모달 내용: 카테고리 추가, 삭제, 이름 변경 UI 및 로직 */}
          </div>
        )}

      </h1>

      <div style={{
        background: '#FFC107',
        borderRadius: '5px',
        padding: '10px',
        maxWidth: '600px',
        margin: 'auto'
      }}>
        <div style={quizContainerStyle}>
          {quizzes.map((quiz, index) => (
            <QuizItem
              key={index}
              title={quiz.title}
              difficulty={quiz.difficulty}
              questionCount={quiz.questionCount}
              questionType={quiz.questionType}
              date={quiz.date}
              onChangeCategory={() => handleChangeCategory(quiz.title)}
              onDelete={() => handleDelete(quiz.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSpace;