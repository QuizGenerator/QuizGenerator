
import './App.css';
import Signup from './components/signup';
import LoginPage from './components/login';
import Main from './components/Main'
import QZPage from './components/QuizData'
import QZSpace from './components/QuizSpace'
import QZSet from './components/QuizSet'
import QZDestination from './components/Destination'
import { AuthProvider } from './components/AuthContext';

import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Destination from './components/Destination';

function App() {
  
  return (
   
    <div className='App'>
      <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact={true} element={<Main />}></Route>
    <Route path="/login" exact={true} element={<LoginPage />}></Route>
    <Route path="/signup" exact={true} element={<Signup />}></Route>
    <Route path="/QuizData" exact={true} element={<QZPage />}></Route>
    <Route path="/QuizSpace" exact={true} element={<QZSpace />}></Route>
    <Route path="/QuizSet" exact={true} element={<QZSet />}></Route>
    <Route path="/Destination/:dataId" exact={true} element={<QZDestination />}></Route>
        
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </div>
  
  );

}

export default App;
