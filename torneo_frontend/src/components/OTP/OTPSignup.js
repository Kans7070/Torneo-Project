import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid,  TextField, Typography } from '@material-ui/core'
import './OTPSignup.css'
import { dataContext } from '../../constants/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function OTPSignup() {
    const [counter, setCounter] = useState(30)
    const [otpError, setOtpError] = useState()
    const [otpNumber, setOtpNumber] = useState()
    const { data, setData } = useContext(dataContext)
    const [phone, setPhone] = useState()
    const navigate = useNavigate()
    

    useEffect(() => {
        if (data) {
            setPhone(data.phone_number)
            console.log(data)
        } else {
            navigate('/signup')
        }

    }, [])

    useEffect(() => {
        counter > 0 && setTimeout(() => {
            setCounter(counter - 1)
        }
            , 1000
        )


    }, [counter])
    const handleSubmit = (e) => {
        if (!otpError&&data.otp_number){

            axios.post('http://127.0.0.1:8000/api/otp/', data).then(res => {
                console.log(res)
                console.log(res.data)
                console.log('verified')
                axios.post('http://127.0.0.1:8000/api/register/', { ...data, }).then(res => {
                    console.log(res)
                    console.log(res.data)
                    navigate('/login')
                }).catch(error => {
                    console.log(error)
                    setOtpError('Entered otp is wrong')
                })
    
            }).catch(error => {
                setOtpError(error)
                console.log(setOtpError);
            })
        }
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        if (value.length!=6){
            setOtpError('6 numbers')
        }else{
            setData({ ...data, [name]: value ,'otp':true})
            setOtpError('')
        }
    }
    const handleResend = (e) => {
        axios.post('http://127.0.0.1:8000/api/otp/', {'phone_number':data.phone_number,'otp': false,'otp_number':''}).then(res => {
                console.log(res.data)
                if (res.data === 'otp sended') {
                  console.log('otp sended')
                  navigate('/signup/otp')
                }
              })
    }

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
                                {<TextField className={otpError?'form_field error_field' : 'form_field'} id="filled-basic" label={otpError?otpError:'Enter the OTP for ' + phone} name='otp_number' onChange={handleOnChange} variant="filled" />}
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

export default OTPSignup