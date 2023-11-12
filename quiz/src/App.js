import logo from './logo.svg';
import './App.css';
import Signup from './components/signup';
import LoginPage from './components/login';
import Main from './components/Main'

import {BrowserRouter, Routes,Route,Link, useSearchParams} from 'react-router-dom'
import { useState } from 'react';

function App() {
  return (
   
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact={true} element={<Main />}></Route>
    <Route path="/login" exact={true} element={<LoginPage />}></Route>
    <Route path="/signup" exact={true} element={<Signup />}></Route>
        
    </Routes>
    </BrowserRouter>
    </div>
  
  );

}

export default App;
