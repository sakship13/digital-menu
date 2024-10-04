import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Attendance() {
	
		const [responseData, setResponseData] = useState(null);
	const [responseDataDonar, setresponseDataDonar] = useState(null);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('ID', '0');
      //formData.append('Name', 'A');
	  //formData.append('uid', localStorage.getItem('sessionToken'));

      const response = await axios.post('http://localhost:3001/api/Attendanceshow', formData, {
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
    SName: '',
    Department: '',
    Year: '',
    });
  
  //const [formData, setParameter] = useState(''); // State to hold the parameter value
  
  
  
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  
  return (
  
        <div class="templatemo-content">

        <h1>Experiment Attendance</h1>
		<hr/>


<div id="container">
<div id="show" class="show">
 


<hr/>
<br/>
 <div class="table-responsive">
 <h4 class="margin-bottom-15">Attendance Table</h4>
  { responseData }
  
 </div>


</div>
</div>
</div>

  );
}

export default Attendance;