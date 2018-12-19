import React from 'react';
import './ListingForm.scss';

class ListingForm extends React.Component {
  render() {
    return (
      <div className="listing-form col">
        <h2>Add New Listing:</h2>
        <form>
  <div className="form-group">
  <label for="exampleInputEmail1">Address:</label>
  <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="123 Mainstreet Nashville TN"/>
</div>
<button className = "btn btn-danger">Save Listing</button>
</form>
      </div>
    );
  }
}

export default ListingForm;
