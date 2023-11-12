
import './App.css';
import Signup from './components/signup';
import LoginPage from './components/login';
import Main from './components/Main'
import QZPage from './components/SEQuizGenerator'

import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  return (
   
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact={true} element={<Main />}></Route>
    <Route path="/login" exact={true} element={<LoginPage />}></Route>
    <Route path="/signup" exact={true} element={<Signup />}></Route>
    <Route path="/SEQuizGenerator" exact={true} element={<QZPage />}></Route>
        
    </Routes>
    </BrowserRouter>
    </div>
  
  );

}

export default App;
