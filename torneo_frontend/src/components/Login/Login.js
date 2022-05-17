import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import './Login.css'
import { Button, Typography, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const initialValues = {
    'username': '',
    'password': '',
  }
  const initialErrors = {
    'username': '',
    'password': '',
  }
  const [formData, setFormData] = useState(initialValues)
  const [formError, setFormError] = useState(initialErrors)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormError({ ...formError, [name]: '' })
  }
  const handleSubmit = (e) => {
    let error = {}
    console.log(formData)
    if (formData.username && formData.password && formData.password.length>=4&&formData.username.length>=4) {
      axios.post('http://127.0.0.1:8000/api/login/', { ...formData }).then(res => {
        console.log(res)
        setUser(res.data)
        localStorage.setItem('user', res.data)
        navigate('/')

      }).catch((err) => {
        setFormError({...formError, error :'user not found'})
      })
    }
    else {
      if (!formData.username) {
        error = { ...error, 'username': 'this field is required' }
      }else{
        if (formData.username.length<4){
          error = { ...error, 'username': 'minimum four'}
        }
      }
      if (!formData.password) {
        error = { ...error, 'password': 'this field is required' }
      }else{
        if (formData.password.length<4){
          error = { ...error, 'password': 'minimum four'}
        }
      }
      setFormError({ ...error })
    }
  }


  return (
    <div>
      <Grid container className='content_holder'>
        <Grid item sx={10} sm={8} md={6}>
          <div className='logo_holder'>
            <div className='logo'>
              <img src='/images/logo.png' />
            </div>
          </div>
          <div className='form_holder content'>
            <div className='page_logo_holder'>
              <div className='page_logo'>
                <img src='/images/signin.png' />
              </div>
            </div>
            <Grid container >
              <Grid item xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.username ? 'form_field error_field' : 'form_field'} id="filled-basic" name='username' label={formError.username ? formError.username : "Username"} variant="filled" onChange={handleOnChange} />
              </Grid>
              <Grid item xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.password ? 'form_field error_field' : 'form_field'} id="filled-basic" name='password' label={formError.password ? formError.password : "Password"} type='password' variant="filled" onChange={handleOnChange} />
              </Grid>
              <Grid item xs={6} className='form_field_holder'>
                <p onClick={(e) => {
                  navigate('/signup')
                }}>
                  Create new account...
                </p>

              </Grid>
              <Grid item xs={6} className='form_field_holder'>
                <p onClick={(e) => {
                  navigate('/forget_password/phone')
                }}>
                  Forget password?
                </p>
              </Grid>
              {formError.error && <Grid item xs={12} className='form_field_holder error'>{formError.error}</Grid>}
              <div className="submit_holder">
                <Button className='submit_field' onClick={handleSubmit} variant="contained">Sign In</Button>
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}

export default Login