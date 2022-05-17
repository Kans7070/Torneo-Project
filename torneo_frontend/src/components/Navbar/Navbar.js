import { Grid } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = (e)=>{
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    
      <Grid container className='navbar_holder'>
        <Grid item xs={10} className='navbar'>
          <p>Tournament</p>
          <p onClick={handleLogout}>logout</p>
        </Grid>
        
       
      </Grid>
    
  )
}

export default Navbar