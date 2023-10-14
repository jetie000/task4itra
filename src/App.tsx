import React from 'react';
import './App.css';
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Users from './pages/Users/Users';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Home isLogin={true} />} />
          <Route path='/' element={<Home isLogin={true} />} />
          <Route path='/register' element={<Home isLogin={false}/>} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
