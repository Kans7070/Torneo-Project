import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LoginPage/LogInPage';
import OTPSignUpPage from './pages/OTPSignUpPage/OTPSignUpPage';
import { useEffect, useState } from 'react';
import { dataContext } from './constants/context';
import ForgetPasswordLoginPage from './pages/ForgetPasswordLoginPage/ForgetPasswordLoginPage';
import ForgetPasswordLoginOtpPage from './pages/ForgetPasswordLoginOtpPage/ForgetPasswordLoginOtpPage';
import ForgetPasswordLoginPhonePage from './pages/ForgetPasswordLoginPhonePage/ForgetPasswordLoginPhonePage';
import TournamentHomePage from './pages/TournamentHomePage/TournamentHomePage';


function App() {
  const [data, setData] = useState()
  const [user, setUser] = useState('')
  useEffect(() => {
    if (localStorage.getItem('user')){
      console.log(localStorage.getItem('user'))
      setUser(localStorage.getItem('user'))
    }
  }, [])

  return (
    <dataContext.Provider value={{ data, setData }}>

      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LogInPage admin={false} />} />
          <Route path='/admin/login' element={<LogInPage admin={true} />} />
          <Route path='/signup/otp' element={<OTPSignUpPage />} />
          <Route path='/forget_password/otp' element={<ForgetPasswordLoginOtpPage />} />
          <Route path='/forget_password/phone' element={<ForgetPasswordLoginPhonePage />} />
          <Route path='/forget_password' element={<ForgetPasswordLoginPage />} />
          <Route path='/tournament' element={<TournamentHomePage />} />
          
        </Routes>
      </Router>

    </dataContext.Provider>

  );
}

export default App;
