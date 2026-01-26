import './App.css';
import LandingHome from './components/Home/LandingHome.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import {Toaster} from 'react-hot-toast';
import UserDashboard from './components/Users/UserDashboard.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import DisplayCategories from './components/Admin/Categories/DisplayCategories.jsx';
import DisplyUsers from './components/Admin/Users/DisplayUsers.jsx';
import DisplayProduct from './components/Admin/Products/DisplayProduct.jsx';
import About from './components/Shared/About.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from './components/Profile/Profile.jsx';

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
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user/Dashboard' element={<UserDashboard/>}/>
        <Route path='/Admin/Dashboard/' element={<AdminDashboard/>}/>
        <Route path='/Admin/Dashboard/users' element={<DisplyUsers/>}/>
        <Route path='/Admin/Dashboard/categories' element={<DisplayCategories/>}/>
        <Route path='/Admin/Dashboard/products' element={<DisplayProduct/>}/>
        <Route path='/profile' element= {<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </> 
  )
}

export default App
