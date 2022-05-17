import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../../constants/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function ForgetPasswordLoginOtp() {
    const { data, setData } = useContext(dataContext)
    const [phone, setPhone] = useState()
    const [otp, setOtp] = useState()
    const [counter, setCounter] = useState(30)
    const navigate = useNavigate()
    const [errors, setErrors] = useState()


    const handleOnChange = (e) => {
        setOtp(e.target.value)
    }
    const handleSubmit = (e) => {
        console.log(otp)
        if (otp) {
            if (otp.length < 7 && otp.length > 5) {
                axios.post('http://127.0.0.1:8000/api/otp/', { 'phone_number': phone, 'otp': true, 'otp_number': otp }).then(res => {
                    navigate('/forget_password')
                }).catch(err => {
                    setErrors('otp is wrong')
                })
            } else {
                setErrors('otp must have 6 numbers')
            }
        } else {
            setErrors('field must be filled')
        }
    }
    const handleResend = (e) => { }

    useEffect(() => {
        setPhone(data.phone)
        counter > 0 && setTimeout(() => {

            setCounter(counter - 1)
        }
            , 1000
        )
       
        console.log('hi')
         
        


    }, [counter])
    
    return (
        <div>
            <Grid container className='content_holder'>
                <Grid item sm={8} md={6}>
                    <div className='logo_holder'>
                        <div className='logo'>
                            <img src='/images/logo.png' />
                        </div>
                    </div>
                    <div className='form_holder content'>
                        <div className='OTP_header_holder'>
                            <h2 className='OTP_header'>OTP </h2>
                            <h2 className='OTP_header'>&nbsp;verification</h2>
                        </div>
                        <Grid container className='OTP_form_field'>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6} className='form_field_holder'>
                                {<TextField className='form_field' id="filled-basic" label='OTP' name='otp_number' onChange={handleOnChange} variant="filled" />}
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            {counter == 0 && <Grid item xs={2} className='form_field_holder'>
                                <Typography className='decoration' onClick={handleResend}>
                                    Resend
                                </Typography>

                            </Grid>}
                            {errors && <Grid item xs={12} className='form_field_holder error'>{errors}</Grid>}


                            <div className="submit_holder">
                                <Button className='submit_field' onClick={handleSubmit} variant="contained">Submit</Button>
                            </div>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ForgetPasswordLoginOtp