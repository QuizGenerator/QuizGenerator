import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const QuizItem = ({ title, difficulty, questionCount, questionType, date, dataId, onChangeCategory, onDelete, onItemClick }) => {
  // 난이도 라벨 정의
  const difficultyLabels = { 'Hard': '상', 'Medium': '중', 'Easy': '하' };
  const handleButtonClick = (event, action) => {
    event.stopPropagation(); // 상위 요소로의 이벤트 전파 방지
    action();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm('퀴즈를 삭제하시겠습니까?')) {
      onDelete(dataId); // 상위 컴포넌트에 삭제 요청 전달
    }
  };
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
    minWidth: '550px',
    cursor: 'pointer',
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
    <div style={quizItemStyle} onClick={() => onItemClick(dataId)}>
      <div style={{ marginRight: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div>난이도: {difficultyLabels[difficulty]} | {questionCount}문제 | {questionType === '객관식' ? '객관식' : '주관식'}</div>
      </div>
      <div style={{ marginRight: '50px' }}>{date}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={(e) => handleButtonClick(e, onChangeCategory)} style={categoryChangeBtnStyle}>
          카테고리 변경
        </button>
        <button onClick={handleDeleteClick} style={deleteBtnStyle}>
  삭제
</button>
        
      </div>
    </div>
  );
};

const QuizSpace = () => {
  const navigate = useNavigate();
  const { authInfo, updateAuthInfo } = useContext(AuthContext);
  
  const navigateToQG = () => {
    navigate('/QuizData');
  };

  const navigateToLogin = () => {
    updateAuthInfo({ name: '', accessToken: '', categories: [] });
    navigate('/login');
  }

  const handleDelete = async (dataId) => {
    if (!dataId) {
      console.error('dataId is undefined');
      return;
    }
    try {
      const response = await axios.delete(`/data/${dataId}`, {
        headers: {
          "Authorization": `Bearer ${authInfo.accessToken}`
        }
      });
      if (response.data) {
        // 삭제 성공 시 퀴즈 목록에서 제거
        setQuizzes(quizzes.filter(quiz => quiz.dataId !== dataId));
      } else {
        console.error('퀴즈 삭제 실패');
      }
    } catch (error) {
      console.error('퀴즈 삭제 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data', {
          headers: {
            "Authorization": `Bearer ${authInfo.accessToken}`
          }
        });
        // API 응답을 기반으로 quizzes 상태를 설정
        const fetchedQuizzes = response.data.map(quiz => ({
          title: quiz.DataTitle,
          difficulty: quiz.Difficulty, // API에서 제공하는 난이도 값 사용
          questionCount: quiz.QuizNum,
          questionType: quiz.Type,
          date: new Date(quiz.created_at).toLocaleDateString() + ' ' + new Date(quiz.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),

          dataId : quiz.dataId
        }));
        console.log(response.data);
        setQuizzes(fetchedQuizzes);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, [authInfo.accessToken, navigate]);
  const handleQuizItemClick = (dataId) => {
    console.log("Data ID" , dataId);
    // destination 페이지로 이동하면서 dataID를 URL 매개변수로 전달
    navigate(`/destination/${dataId}`);
  };

  

  const [activeTab, setActiveTab] = useState('미분류');
  const [quizzes, setQuizzes] = useState([]);
  // 카테고리 관련 상태
  const [categories, setCategories] = useState(['미분류', '카테고리1', '카테고리2']);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // 카테고리 변경 모달 상태
  const [showChangeCategoryModal, setShowChangeCategoryModal] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);

  // 카테고리 변경 모달을 여는 함수
  const openChangeCategoryModal = (quizTitle) => {
    setShowChangeCategoryModal(true);
    setSelectedQuizTitle(quizTitle);
  };

  // 카테고리 변경 모달을 닫는 함수
  const closeChangeCategoryModal = () => {
    setShowChangeCategoryModal(false);
    setSelectedQuizTitle(null);
  };


  // 카테고리 관리 모달을 여는 함수
  const openCategoryModal = () => {
    setShowCategoryModal(true);
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

  const NameAndQuizContainerStyle = {
    // zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // 컨테이너 세로축의 중앙으로 정렬
    justifyContent: 'center', // 요소들 사이에 공간 추가
    width: '60%', // 너비 65%
    maxHeight: '60%', // 너비 65%
    // margin: '20px auto',
  };

  const categoryNameDisplayPosition = {
    // alignSelf: 'flex-start', // 부모 컨테이너의 시작점에 정렬
    padding: '10px 0',
    zIndex: 10,
    width: '100%', // 전체 폭 사용
  };


  const tabContainerStyle = {
    position: 'absolute',
    top: '19%',
    display: 'flex',
    overflowX: 'auto', // 가로 스크롤 가능하게 설정
    maxWidth: '60%', // 너비 65%
    width: '60%', // 너비 65%
    whiteSpace: 'nowrap', // 줄바꿈 X
    // margin: 'auto', // 가운데 정렬
    // position: 'absolute', // 절대 위치
  };

  const quizContainerStyle = {
    position: 'relative', // 상대 위치
    top: '20px',
    maxHeight: '460px', // 컨테이너의 최대 높이 설정
    overflowY: 'auto', // 세로 스크롤 적용
    width: '100%', // 컨테이너의 너비 설정
    maxHeight: '80%', // 너비 65%
    height: '80%', // 너비 65%
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
  // 카테고리 이름 상태
  const [categoryName, setCategoryName] = useState(activeTab);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCategoryName(activeTab); // activeTab이 변경될 때마다 categoryName을 업데이트
  }, [activeTab]);


  // 카테고리 이름 변경 처리 함수
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  // 카테고리 이름 수정 모드 활성화
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 카테고리 이름 수정 적용
  const handleApplyEdit = () => {
    setIsEditing(false);
    // 여기서 변경된 카테고리 이름을 서버에 저장하는 로직을 추가할 수 있습니다
  };

  // 카테고리 삭제 처리
  const handleDeleteCategory = () => {
    // 카테고리 삭제 처리 로직
    alert("카테고리가 삭제되었습니다");
    // 카테고리 삭제 후 필요한 동작 수행
  };

  // 카테고리 이름 표시 및 편집 UI
  const categoryNameDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬
    width: '100%', // 전체 폭 사용
    padding: '10px 0', // 여백 추가
    fontSize: '2em', // 글씨 크기 증가
    fontWeight: 'bold',
    zIndex: 10
  };

  const categoryNameDisplay = (
    <div style={categoryNameDisplayStyle}>
      {isEditing ? (
        <input
          type="text"
          value={categoryName}
          onChange={handleCategoryNameChange}
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            width: '280px' // 너비 조절  
          }} // 텍스트 입력란 글씨 크기 조절
        />
      ) : (
        <span>{categoryName}</span>
      )}
      <button onClick={isEditing ? handleApplyEdit : handleEditClick}>
        {isEditing ? "적용" : "수정"}
      </button>
      <button onClick={handleDeleteCategory}>삭제</button>
    </div>
  );


  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleNewCategoryNameChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const addCategory = () => {
    if (newCategoryName.trim() !== '') {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName('');
    }
    setIsAddingCategory(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addCategory();
    }
  };

  const categoryNameInput = isAddingCategory ? (
    <input
      type="text"
      value={newCategoryName}
      onChange={handleNewCategoryNameChange}
      onKeyDown={handleKeyDown}
      onBlur={addCategory} // 다른 곳 클릭 시 적용
      autoFocus
    />
  ) : (
    <button onClick={() => setIsAddingCategory(true)}>카테고리 추가</button>
  );



  return (
    <div style={mainContainerStyle}>
      <button onClick={navigateToQG} style={navigateToQGBtnStyle}>
        QG
      </button>
      <div style={orangeShapeStyle}></div>
      <div style={topRightContainerStyle}>
        <div style={welcomeTextStyle}>{authInfo.name}님 환영합니다.</div>
        <button onClick={navigateToLogin} style={logoutButtonStyle}>로그아웃</button>
      </div>
      <h1 style={{ // 페이지표시(h1): "QuizSpace"
        position: 'absolute',
        top: '13%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>QuizSpace
      </h1>
      <div style={tabContainerStyle}>
        <TabButton name='미분류' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리1' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리2' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리3' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리4' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리5' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리6' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리7' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리8' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name='카테고리9' activeTab={activeTab} setActiveTab={setActiveTab} />
        {categoryNameInput}
      </div>
      <div style={NameAndQuizContainerStyle}>
        <div style={categoryNameDisplayPosition}>
          {categoryNameDisplay}
        </div>
        <div style={quizContainerStyle}>

          {quizzes.map((quiz, index) => (
            <QuizItem
              key={index}
              title={quiz.title}
              difficulty={quiz.difficulty}
              questionCount={quiz.questionCount}
              questionType={quiz.questionType}
              date={quiz.date}
              onChangeCategory={() => openChangeCategoryModal(quiz.title)}
              onDelete={()=> handleDelete(quiz.dataId)}
              onItemClick={() => handleQuizItemClick(quiz.dataId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSpace;