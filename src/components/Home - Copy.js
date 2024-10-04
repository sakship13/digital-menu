import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
        <div class="templatemo-content">

          <h1>Anganwadi Portal</h1>
		<hr/>
		<div class="col-sm-12">
		<br/>
          <p> 
		
            <a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
                Members<br/>Add,Edit and Manage Members<br/><br/>
            </a> 
			<a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
			Childrens<br/>View Childrens List<br/><br/>
            </a> 
			<a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
           Activities <br/>View Activities<br/><br/>
            </a>
 
            <a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
              Nutrition Supplement<br/>Manage Nutrition Supplement<br/><br/>
            </a>
			<br/><br/>
            <a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
              Nutrition Supplement <br/> For Childrens<br/><br/>
            </a>	
            <a to="/Home" class="btn btn-sq btn-primary" style={{width:'250px'}}><br/>
              Growth <br/> Monitoring Growth<br/><br/>
            </a>	
			
          </p>
        </div>
      </div>
  );
}

export default Home;