import axios from 'axios';



export const handleLoginSubmit = (username,password) =>{
    console.log(username, password)
    if (username&&password){
    axios.post('http://127.0.0.1:8000/api/login/',{'username' : username,'password':password,}).then(res=>{
      console.log(res)
      axios.get(`http://127.0.0.1:8000/api/user/${res.data}/`).then(res=>{
        console.log(res.data)
        return res.data
      }).catch(err=>{
          console.log(err)
          return err
      })
      
    }).catch((err)=>{
        return 'user not found'
    })}
    else {
        return 'all field must be filled'
    }
  }