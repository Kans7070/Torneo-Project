import { Button, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../../constants/context'
import './ForgetPasswordLogin.css'


function ForgetPasswordLogin() {
  const [password, setPassword] = useState()
  const [retypepassword, setRetypePassword] = useState()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const {data} = useContext(dataContext)
  const handleSubmit = (e) => {
    if (password&&retypepassword){
      if (password===retypepassword){
        axios.put(`http://127.0.0.1:8000/api/user/${data.id}/`,{"password":password}).then(res=>{
          console.log(res)
          navigate('/login')
        }).catch(e => {
          console.log(e)
        })
      }else{
        setError('not same')
      }
    }else{
      setError('all field must be filled')
    }
  }
  useEffect(() => {
    setError('')
  },[password,retypepassword])
  useEffect(() => {
    try {
      if (data.id){

      }
    } catch (error) {
      navigate('/forget_password/phone')
    } 
      
    
  })
  return (
    <div>
        <Grid container className='content_holder'>
          <Grid item sx={10} sm={8} md={6}>
            <div className='logo_holder'>
              <div className='logo'>
              <img src='/images/logo.png'/>
              </div>
            </div>
            <div className='form_holder content'>
            <div className='page_logo_holder'>
              <div className='page_logo wdft'>
              <h3>Create a new password</h3>
              </div>
            </div>
            <Grid container >
              <Grid item xs={6} className='form_field_holder'>
              <TextField className='form_field' id="filled-basic" label="Password" variant="filled"  type='password' onChange={ (e) => setPassword(e.target.value) }/>
              </Grid>
              <Grid item xs={6} className='form_field_holder'>
              <TextField className='form_field' id="filled-basic" label="Re-password" type='password' variant="filled"  onChange={(e) => setRetypePassword(e.target.value)}/>
              </Grid>
              
              {error && <Grid item xs={12} className='form_field_holder error'>{error}</Grid>}
              <div className="submit_holder">
              <Button className='submit_field' onClick={handleSubmit} variant="contained">Change</Button>
              </div>
            </Grid>
            </div>
          </Grid>
        </Grid>
    </div>
  )
}

export default ForgetPasswordLogin