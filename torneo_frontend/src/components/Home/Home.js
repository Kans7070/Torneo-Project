import Grid from '@mui/material/Grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const HandleOnClick=(data)=>{
    if (data==='shop'){
      navigate('/shop')
    }else{
      navigate('/tournament')
    }
  }
  return (
    <div>
      <Grid container className='content_holder'>
        <Grid item sm={8}>
          <div className='logo_holder'>
            <div className='logo'>
              <img src='/images/logo.png' />
            </div>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3} sx={{justifyContent: 'center'}}>
            <Grid item xs={10} md={6} className='home_option_holder' onClick={e=>HandleOnClick('tournament')}>
              <div className='home_option'>
                <div className='home_options_logo'>
                  <img src="/images/iconoir_tournament.png" alt="" />
                </div>
                  <p>Tournaments</p>
              </div>
            </Grid>
            <Grid item xs={10} md={6} className='home_option_holder' onClick={e=>HandleOnClick('shop')}>
              <div className='home_option'>
                <div className='home_options_logo'>
                  <img src="/images/Group 202.svg" alt="" />
                </div> 
                  <p>Shop</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home