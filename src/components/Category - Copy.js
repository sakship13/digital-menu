import React from 'react';

function Category() {
  return (
  
        <div class="templatemo-content">

        <h1>All Experiment Subject List</h1>
		<hr/>


<div id="container">
<div id="show" class="show">
<div id="cp_contact_form">
<form name="form" id="form">

			<div class="row">
                  <div class="col-md-6 margin-bottom-15">
                    <label for="firstName" class="control-label">Department</label>
                    <select name="content4" class="form-control" id="firstName">
					<option value="CSE">CSE</option>
					<option value="Civil">Civil</option>
					<option value="Mech">Mech</option>
					</select>
                  </div>
				  
				  
				  <div class="col-md-6 margin-bottom-15">
                    <label for="firstName" class="control-label">Year</label>
                    <select name="content4" class="form-control" id="firstName">
					<option value="FE">FE</option>
					<option value="SE">SE</option>
					<option value="TE">TE</option>
					<option value="BE">BE</option>
					</select>
                  </div>
				  
                </div>

                				<div class="row">
                  <div class="col-md-12 margin-bottom-15">
                    <label for="firstName" class="control-label">Subject</label>
                    <input type="text" name="content4" class="form-control" id="firstName"/>

                  </div>

                </div>
 


              <div class="row templatemo-form-buttons">
                <div class="col-md-12">
                  <button type="button" name="submit" class="submit_button">Save</button>   
                </div>
              </div>

</form>
</div>


<div class="table-responsive">
<h4 class="margin-bottom-15">All Subject Table</h4>
<table class="table table-striped table-hover table-bordered">
<thead><tr>
<td><b> ID</b></td>
<td><b> Department</b></td>
<td><b> Year</b></td>
<td><b> Subject</b></td>
<td></td>
</tr></thead>
<tbody>

<tr>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td><a href="#" class="ABCD" id=" ">[ X ]</a>
<a href="#" class="Edit" id=" ">[ Edit ]</a>
</td>
</tr>
 
</tbody>
</table> 
</div>


</div>
</div>
</div>

  );
}

export default Category;