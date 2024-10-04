import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Category() {
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
		const [responseData, setResponseData] = useState(null);
	const [responseDataDonar, setresponseDataDonar] = useState(null);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('ID', '0');
      //formData.append('Name', 'A');
	  //formData.append('uid', localStorage.getItem('sessionToken'));

      const response = await axios.post('http://localhost:3001/api/Feedbackshow', formData, {
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

        <h1>Feedback</h1>
		<hr/>


<div id="container">
<div id="show" class="show">
 


<hr/>
<br/>
 <div class="table-responsive">
 <h4 class="margin-bottom-15">Feedback Table</h4>
  { responseData }
  
 </div>


</div>
</div>
</div>

  );
}

export default Category;