import { Button, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../../constants/context'

function ForgetPasswordLoginPhone() {
    const [phone, setPhone] = useState()
    const [errors, setErrors] = useState()
    const { data, setData } = useContext(dataContext)
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        setPhone(e.target.value)
    }
    const handleSubmit = (e) => {
        console.log(phone)
        console.log(data)
        let flag = false
        
        if (phone) {
            axios.get('http://127.0.0.1:8000/api/user/').then(res => {
                console.log(res.data)
                console.log(res.data.length)
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].phone_number)
                    if (res.data[i].phone_number == phone) {
                        flag = true
                        setData({...data,'id' : res.data[i].id})
                        console.log(res.data[i].id)
                        break;
                    }
                }
                if (flag) {
                    axios.post('http://127.0.0.1:8000/api/otp/', { 'phone_number': phone, 'otp': false, 'otp_number': '' }).then(res => {
                        navigate('/forget_password/otp')
                    })
                } else {
                    setErrors('no user with this phone number')
                }

            })
        }
        else {
            setErrors('field must be filled')
        }
    }
    useEffect(() => {
        setData({ 'phone': phone, 'otp': false })
        console.log(phone)
    }, [phone])


    return (
        <div>
            <Grid container className='content_holder'>
                <Grid item sm={8} md={6}>
                    <div className='logo_holder'>
                        <div className='logo'>
                            <h src='/images/logo.png' />
                        </div>
                    </div>
                    <div className='form_holder content'>
                        <div className='OTP_header_holder'>
                            <h2 className='OTP_header'>OTP </h2>
                            <h2 className='OTP_header'>&nbsp;verification</h2>
                        </div>
                        <Grid container className='OTP_form_field'>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={8} className='form_field_holder'>
                                {<TextField className='form_field number' id="filled-basic" type='number' label='phone number' name='phone_number' onChange={handleOnChange} variant="filled" onWheel={(e) => e.target.blur()}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                    }} />}
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
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

export default ForgetPasswordLoginPhone