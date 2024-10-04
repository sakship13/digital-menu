import React, { useState,useEffect } from 'react';


import axios from 'axios';

function Login({ setIsAuthenticated }) {
    useEffect(() => {
        // Create link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${process.env.PUBLIC_URL}/css/templatemo_main.css`; // Use the correct path from public folder
    
        // Append to the document head
        document.head.appendChild(link);
    
        // Cleanup function to remove the link when the component unmounts
        return () => {
          document.head.removeChild(link);
        };
      }, []);
	
	const [formData, setFormData] = useState({
    UName: '',
    Upass: '',
    });
  
  //const [formData, setParameter] = useState(''); // State to hold the parameter value
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
		  
      const response = await axios.post('http://localhost:3001/api/Loginpage', formData);
	  console.log('Login response:', response.data.message);
	  
	  if (response.data.message ==='Login successful') {
		  alert('Login Successfully..!');
          setIsAuthenticated(true);
      }
	  
      // You can add code here to handle success or show a success message to the user.
   } catch (error) {
		  alert(error);
      console.error('Error submitting form data:', error);
    }
  }
  
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  
  return (
  
        <div id="main-wrapper">
    <div class="template-page-wrapper">
      <form class="form-horizontal templatemo-signin-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <div class="col-md-12">
            <label for="username" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="UName" placeholder="Email" onChange={handleInputChange} value={formData.UName}/>
            </div>
          </div>              
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <label for="password" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" name="Upass" placeholder="Password" onChange={handleInputChange} value={formData.Upass}/>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <div class="col-sm-offset-2 col-sm-10">
 				<div className="button"><button type="submit" class="form-control" name="signin">Sign in</button></div>

            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  );
}

export default Login;