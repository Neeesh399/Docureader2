import React from 'react';
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './pages';
import Login from './pages/login';
import Signup from './pages/signup';

import Header from './components/header.js'


function App() {
  return (
    <div>

      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
