import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navbar, Footer } from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './Components/Courses';
import Student from './Components/Students'
import Enrollment from './Components/Enrollment'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/Courses' element={<Courses/>}></Route>
    <Route path='/Student' element={<Student/>}></Route>
    <Route path='/Enrollment' element={<Enrollment/>}></Route>
  </Routes>
  <Footer/>
  </BrowserRouter>
 
  </>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
