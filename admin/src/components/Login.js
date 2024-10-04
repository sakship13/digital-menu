import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ setIsLoggedIn }) {
    const [data,setData]=useState({
        email:"",
        pass:"",
    })
    const navigate = useNavigate();
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onLogin =async(event)=>{
         event.preventDefault();
         const response = await axios.post('http://localhost:3307/api/login',data);
         if(response.data.success){
            toast.success("Login successful")
            setIsLoggedIn(true);
            navigate("/admin");
         }
         else{
            toast.error("Login unsuccessful")
         }

    }
  return (
    <div className='login-page'>
        <h1>Login as a Chef</h1>
          <form onSubmit={onLogin}>
       <div className="input-field">
        <input type="text" placeholder='E-mail' value={data.email} name="email" onChange={onChangeHandler}/>
        <input type="text" placeholder='Password'value={data.pass} name="pass" onChange={onChangeHandler}/>
       </div>
       <button type='submit'>Login</button>
       </form>
    </div>
  )
}

export default Login
