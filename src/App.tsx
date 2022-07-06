import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import NavBar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<NavBar/>}/>
        {/* <Route path='/home' element={<Home/>}/> */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
