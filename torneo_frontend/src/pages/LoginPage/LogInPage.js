import React from 'react'
import AdminLogin from '../../components/AdminLogin/AdminLogin'
import Login from '../../components/Login/Login'

function LogInPage({admin}) {
  console.log(admin)
  return (
    <div>
        {admin?<AdminLogin/>:<Login/>}
    </div>
  )
}

export default LogInPage