
import './App.css';
import Signup from './components/signup';
import LoginPage from './components/login';
import Main from './components/Main'
import QZPage from './components/QuizData'
import QZSpace from './components/QuizSpace'
import QZSet from './components/QuizSet'

import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  return (
   
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact={true} element={<Main />}></Route>
    <Route path="/login" exact={true} element={<LoginPage />}></Route>
    <Route path="/signup" exact={true} element={<Signup />}></Route>
    <Route path="/QuizData" exact={true} element={<QZPage />}></Route>
    <Route path="/QuizSpace" exact={true} element={<QZSpace />}></Route>
    <Route path="/QuizSet" exact={true} element={<QZSet />}></Route>
        
    </Routes>
    </BrowserRouter>
    </div>
  
  );

}

export default App;
