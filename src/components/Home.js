import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
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
  return (
        <div class="templatemo-content">

          <h1>Experiment App</h1>
		<hr/>
 
 
 
		
            <img src="bgexp.png" width="100%" />
			
 
 
      </div>
  );
}

export default Home;