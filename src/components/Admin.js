import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Admin() {
	
	const [responseData, setResponseData] = useState(null);
	const [responseDataDonar, setresponseDataDonar] = useState(null);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('ID', '0');
      //formData.append('Name', 'A');
	  //formData.append('uid', localStorage.getItem('sessionToken'));

      const response = await axios.post('http://localhost:3001/api/Usershow', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

	 
      setResponseData(<div dangerouslySetInnerHTML={{ __html: response.data }} />);
    } catch (error) {
		alert(error);
      console.error('Error:', error);
    }
  };
	
	  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount
  
	const [formData, setFormData] = useState({
    Uname: '',
    Email: '',
    Utyp: '',
    Pass: '',
    Mobile: '',
    });
	
	const handleSubmit = async (e) => {
    e.preventDefault();

    try {
	
		var all=0;
		//alert(formData.SName);
		if (/^[A-Za-z ]+$/.test(formData.Uname) && formData.Uname!='') {
 
		} else {
		  alert('Invalid name format. Use "First Last"');
		  all=1;
		}
		
		if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.Email) && formData.Email!='') {
 
		} else {
		  alert('Invalid email address.');
		  all=1;
		}

		if (/^\d{10}$/.test(formData.Mobile) && formData.Mobile!='') {
 
		} else {
		  alert('Mobile Enter a 10-digit numbers only..');
		  all=1;
		}

		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.Pass) && formData.Pass!='') {

		} else {
		  alert('Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 8 characters in length.');
		  all=1;
		}
		
	if(all==0)
		{
      const response = await axios.post('http://localhost:3001/api/Userinsert',  formData);
      console.log('Form data submitted successfully:', response.data);
	  alert('User Register Successfully..!');
		}
      // You can add code here to handle success or show a success message to the user.
    } catch (error) {
		  
      console.error('Error submitting form data:', error);
      // You can add code here to handle errors or show an error message to the user.
    }
  }
  
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  
  return (
  

        <div class="templatemo-content">

          <h1>All Staf/Members Details</h1>
		 <hr/>


<div id="container">
<div id="show" class="show">
<div id="cp_contact_form">
<form onSubmit={handleSubmit}>

                <div class="row">
                  <div class="col-md-6 margin-bottom-15">
                    <label for="firstName" class="control-label">User Name</label>
                    <input type="text" name="Uname" class="form-control" id="firstName" Placeholder="First and Last Name" onChange={handleInputChange} value={formData.Uname} />           
                  </div>
                  <div class="col-md-6 margin-bottom-15">
                    <label for="lastName" class="control-label">User Email</label>
                    <input type="text" name="Email"  class="form-control" id="lastName" Placeholder="Email" onChange={handleInputChange} value={formData.Email}/>        
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 margin-bottom-15">
                    <label for="firstName" class="control-label">User Password</label>
                    <input type="Password" name="Pass" class="form-control" id="firstName" Placeholder="Password" onChange={handleInputChange} value={formData.Pass}/>           
                  </div>
				   <div class="col-md-6 margin-bottom-15">
                    <label for="lastName" class="control-label">Mobile</label>
                    <input type="text" name="Mobile"  class="form-control" id="lastName" Placeholder="Mobile" onChange={handleInputChange} value={formData.Mobile}/>  
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 margin-bottom-15">
                    <label for="firstName" class="control-label">User Type</label>
                    <select name="Utyp" class="form-control" id="firstName" onChange={handleInputChange} value={formData.Utyp}>
					<option value="Admin">Admin</option>
					<option value="Teacher">Teacher</option>
					</select>
                  </div>
				  

                </div>

 

				

              <div class="row templatemo-form-buttons">
                <div class="col-md-12">
					<div className="button"><button type="submit" class="form-control">Submit</button></div>
                </div>
              </div>

</form>
</div>
<hr/>
<br/>
 <div class="table-responsive">
 <h4 class="margin-bottom-15">Users Table</h4>
  { responseData }
  
 </div>
  
</div>
</div>
</div>
  );
}

export default Admin;