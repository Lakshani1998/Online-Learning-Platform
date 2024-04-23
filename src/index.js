import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navbar, Footer } from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './Components/Courses';
import Student from './Components/Students'
import Enrollment from './Components/Enrollments'
import Home from './Components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/Home' element={<Home/>}></Route>
    <Route path='/Courses' element={<Courses/>}></Route>
    <Route path='/Student' element={<Student/>}></Route>
    <Route path='/Enrollment' element={<Enrollment/>}></Route>
  </Routes>
  <Footer/>
  </BrowserRouter>
 
  </>
);


reportWebVitals();
