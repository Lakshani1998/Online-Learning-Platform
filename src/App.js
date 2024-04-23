import './App.css';
import { Navbar, Footer } from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './Components/Courses';
import Student from './Components/Students'
import Enrollment from './Components/Enrollments'
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div className="App">
      {/* <LandingPage/> */}
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
    </div>
  );
}

export default App;
