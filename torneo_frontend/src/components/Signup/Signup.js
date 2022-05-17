import React, { useContext, useEffect, useState } from 'react'
import { Button, Typography, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './Signup.css'
import axios from 'axios'
import { dataContext } from '../../constants/context';
import validator from 'validator';


function Signup() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState()
  const { setData } = useContext(dataContext)
  const [error, setError] = useState()
  const initialValues = {
    'first_name': '',
    'last_name': '',
    'email': '',
    'username': '',
    'password': '',
    'phone_number': '',
    'place': '',
  }
  const [formData, setFormData] = useState(initialValues)
  const initialErrors = {
    'first_name': '',
    'last_name': '',
    'email': '',
    'username': '',
    'password': '',
    'phone_number': '',
    'place': '',
    'error': '',
  }
  const [formError, setFormError] = useState(initialErrors)
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
  
  function Validate(data,name){
    if (!data){
    return {[name]: 'this field must be filled' }
    }else{
      if(name==='email') {if (!ValidateEmail(formData.email)) {
        return {[name]: 'email must be valid'}
      }}
      if(name==='retype_password'&&formData.password!==data){
        return {[name]: 'not matching'}
      }
      if(name==='phone_number'){
        if (data.length != 10){
          return {[name]: '10 numbers required'}
        }
      }else{
        if (data.length < 4){
          return {[name]: 'minimum 4 required'}
        }
      }
      return {[name]:''}
    }
    
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    e = Validate(value,name)
    console.log(e)
    setFormError({ ...formError,[name]:e[name]})
  }

  
  const handleSubmit = (e) => {
    let err = {}
    if (formData.first_name && formData.last_name && formData.username && formData.email && formData.phone_number && formData.place && formData.password && formData.retype_password) {
      for(const key in formError){
        if(formError[key]){
          var validate=false
        }
        else{
          validate=true
        }
      }
      if (validate) {
        console.log('2')
        axios.get('http://127.0.0.1:8000/api/user/').then(res => {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i]);
            console.log(res.data[i].username);
            console.log(res.data[i].email);
            console.log(formData.email)
            console.log(res.data[i].phone_number===formData.email);

            if (res.data[i].username === formData.username) {
              err = { ...err, 'username': 'username already exists' }
              console.log('hai')
            }
            else if (res.data[i].email === formData.email) {
              err = { ...err, 'email': 'email already exists' }
              console.log('hai1')
            }
            else if (res.data[i].phone_number === formData.phone_number) {
              err = { ...err, 'phone_number': 'this phone number already exists' }
              console.log('hai2')
            }
            else{
              err=null
            }
            console.log(err)
            if (err) {
              setFormError({ ...formError, ...err })
              break;
            }
          }
          console.log(err)
          if (!err) {
            console.log('haaai')
            setData(formData)
            axios.post('http://127.0.0.1:8000/api/otp/', { ...formData, 'otp_number': '', 'otp': false }).then(res => {
              console.log(res.data)
              if (res.data === 'otp sended') {
                console.log('otp sended')
                navigate('/signup/otp')
              }

            }).catch(error => {
              console.log(error)
              setFormError({ ...formError, 'error': 'user not created' })
            })

          } else {
            console.log(err);
            console.log('kanssss')
          }

        }).catch(err => console.log(err));
      }
    } else {
      for(const keys in formData){
        e=Validate(formData[keys],keys)
        console.log(formError)
        if (e[keys]){
          err = { ...err,[keys]:e[keys]}
        }
      }
      setFormError({ ...formError,...err})
    }
  }


  return (

    <div>
      <Grid container className='content_holder'>
        <Grid item xs={11} md={6}>
          <div className='logo_holder'>
            <div className='logo'>
              <img src='/images/logo.png' />
            </div>
          </div>
          <div className='form_holder content'>
            <div className='page_logo_holder'>
              <div className='page_logo'>
                <img src='/images/signup.png' />
              </div>
            </div>
            <Grid container >
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.first_name ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.first_name ? formError.first_name : "First-name"} name='first_name' variant="filled" onChange={handleOnChange} />

              </Grid>

              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.last_name ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.last_name ? formError.last_name : "Last-name"} name='last_name' variant="filled" onChange={handleOnChange} />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.username ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.username ? formError.username : "Username"} name='username' variant="filled" onChange={handleOnChange} />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.email ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.email ? formError.email : "Email"} name='email' variant="filled" onChange={handleOnChange} />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.phone_number ? 'form_field error_field number' : 'form_field number'} id="filled-basic" type='number' label={formError.phone_number ? formError.phone_number : "Mobile No"} name='phone_number' variant="filled" onChange={(e) => {
                  setPhone(e.target.value)
                  handleOnChange(e)
                }} onWheel={(e) => e.target.blur()}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                  }}
                />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder' >
                <TextField className={formError.place ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.place ? formError.place : "Place"} name='place' variant="filled" onChange={handleOnChange} />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.password ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.password ? formError.password : "Password"} name='password' variant="filled" type='password' onChange={handleOnChange} />

              </Grid>
              <Grid item  xs={12} md={6} className='form_field_holder'>
                <TextField className={formError.retype_password ? 'form_field error_field' : 'form_field'} id="filled-basic" label={formError.retype_password ? formError.retype_password : "Retype-Password"} name='retype_password' variant="filled" type='password' onChange={handleOnChange} />

              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={7} className='form_field_holder'>
                <Typography onClick={(e) => {
                  navigate('/login')
                }}>
                  Already have an account...
                </Typography>
              </Grid>
              {formError.error && <Grid item xs={12} className='form_field_holder error'>{formError.error}</Grid>}

              <div className="submit_holder">
                <Button type="button" className='submit_field' onClick={handleSubmit} variant="contained">Sign Up</Button>
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Signup