import './App.css';
import LandingHome from './components/Home/LandingHome.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Toaster from 'react-hot-toast';
import UserDashboard from './components/Users/UserDashboard.jsx';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    {/* اين يظهر المسج */}
    <Toaster position="top-center"/>
    <BrowserRouter>
      <Routes>
        {/* defin routes */}
        <Route path='/' element= {<LandingHome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
      </Routes>
    </BrowserRouter>



    </> 
  )
}

export default App
