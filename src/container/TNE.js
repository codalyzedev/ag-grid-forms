import React, { Component } from 'react';
import Input from '../components/inputType';
import Select from '../components/Select';
import rawData from '../rawData'
class TNE extends Component {

  render() {

    return (
      <div>
        <div className="tne">
          <form className="tne__form">
            <Input placeholder="Employee name" type="text"  classes="form-control"/>
            <Input placeholder="Designation" type="text"  classes="form-control"/>
            <label>
              Domestic travel
              <Input type="checkbox" isChecked="checked"  classes="form-control"/>
            </label>
            <label>
              International travel
              <Input type="checkbox"  classes="form-control"/>
            </label>
            <label>
              Travel Desk Booking
              <Input type="checkbox" isChecked="checked"  classes="form-control"/>
            </label>
            <label>
              Self Booking
              <Input type="checkbox"  classes="form-control"/>
            </label>
            <Input placeholder="Business purpose" type="text"  classes="form-control"/>
            <textarea placeholder="Purpose of travel"></textarea>
            <label>
              Departure date
              <Input placeholder="Business purpose" type="date"  classes="form-control"/>
            </label>
            <label>
              Departure time
              <Input placeholder="Business purpose" type="time"  classes="form-control"/>
            </label>
            <label>
             From City
            <Select options={rawData.cities} classes="form-control"/>
            </label>
            <label>
             To City
            <Select options={rawData.cities} classes="form-control"/>
            </label>
            <label>
             Travel Mode
            <Select options={rawData.travelMode} classes="form-control"/>
            </label>
            <label>
            Class
           <Input disabled="disabled" value="normal" type="text" classes="form-control"/>
            </label>
            <label>
             Cab type
            <Select options={rawData.cabTypes} classes="form-control"/>
            </label>
            <label>
             Cab Purpose
            <Select options={rawData.cabPurpose} classes="form-control"/>
            </label>
            <label>
            Number of nights stay in hotel
           <Input  type="number" classes="form-control"/>
            </label>
            <label>
            Name of  hotel
           <Input  type="text" classes="form-control"/>
            </label>
            <label>
            Cost Centre
            <Select options={rawData.cabTypes} classes="form-control"/>
            </label>
            <label>
            Budget
            <Select options={rawData.cabPurpose} classes="form-control"/>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default TNE;
