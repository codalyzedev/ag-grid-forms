import React, { Component } from 'react';
import Input from '../components/inputType';
import Select from '../components/Select';
import rawData from '../rawData';
class TNE extends Component {
  constructor() {
    super();
    this.state = {
      isBookingTypeChanged: false,
      isVisaAvailable: true
    };
    this.nameOfHotel = {};
  }
  changeBookingType = e => {
    console.log(e.target);
  };
  isStayZero = e => {
    // console.log(typeof(e.target.value));
    this.nameOfHotel.disabled = false;
    e.target.value === '0' && (this.nameOfHotel.disabled = true);
  };
  changeTravelType = e => {
    this.setState(prevState => ({
      isTravelTypeChanged: !prevState.isTravelTypeChanged
    }));
  };
  render() {
    return (
      <div>
        <div className="tne">
          <form className="tne__form">
            <Input
              placeholder="Employee name"
              type="text"
              classes="form-control"
            />
            <Input
              placeholder="Designation"
              type="text"
              classes="form-control"
            />
            <div>
              <label>
                <Input
                  type="radio"
                  name="travel-type"
                  value="D"
                  onChange={this.changeTravelType}
                  checked="checked"
                />
                Domestic travel
              </label>
              <label>
                <Input
                  type="radio"
                  name="travel-type"
                  value="I"
                  onChange={this.changeTravelType}
                />
                International travel
              </label>
            </div>

            <label>
              <Input
                type="radio"
                name="booking-type"
                value="TA"
                onChange={this.changeBookingType}
                checked="checked"
              />
              Travel Desk Booking
            </label>
            <label>
              <Input
                type="radio"
                name="booking-type"
                value="Employee"
                onChange={this.changeBookingType}
              />
              Self Booking
            </label>
            <Input
              placeholder="Business purpose"
              type="text"
              classes="form-control"
            />
            <textarea
              placeholder="Purpose of travel"
              className="form-control"
            ></textarea>
            <label>
              Departure date
              <Input
                placeholder="Business purpose"
                type="date"
                classes="form-control"
              />
            </label>
            <label>
              Departure time
              <Input
                placeholder="Business purpose"
                type="time"
                classes="form-control"
              />
            </label>
            <label>
              From City
              <Select options={rawData.cities} classes="form-control" />
            </label>
            <label>
              To City
              <Select options={rawData.cities} classes="form-control" />
            </label>
            <label>
              Travel Mode
              <Select options={rawData.travelMode} classes="form-control" />
            </label>
            <label>
              Class
              <Input
                disabled="disabled"
                value="economy"
                type="text"
                classes="form-control"
              />
            </label>
            <label>
              Cab type
              <Select options={rawData.cabTypes} classes="form-control" />
            </label>
            <label>
              Cab Purpose
              <Select options={rawData.cabPurpose} classes="form-control" />
            </label>
            <label>
              Number of nights stay in hotel
              <Input
                type="number"
                classes="form-control"
                onChange={this.isStayZero}
              />
            </label>
            <label>
              Name of hotel
              <Input
                type="text"
                classes="form-control"
                passRef={ref => (this.nameOfHotel = ref)}
              />
            </label>
            <label>
              Cost Centre
              <Select options={rawData.cabTypes} classes="form-control" />
            </label>
            <label>
              Budget
              <Select options={rawData.cabPurpose} classes="form-control" />
            </label>
            {this.state.isTravelTypeChanged && <>
            <label>
              Currency request(Forex):
              <Input type="text" classes="form-control" />
            </label>
            <label>
              Currency
              <Select options={rawData.currency} classes="form-control" />
            </label>
            <label>
              Amount:
              <Input type="number" classes="form-control" />
            </label>

            <fieldset>
              <legend>Passport Details:</legend>
              <label>
                {' '}
                Name: <Input type="text" classes="form-control" />
              </label>
              <label>
                {' '}
                Email id: <Input type="email" classes="form-control" />
              </label>
              <label>
                {' '}
                DOB: <Input type="date" classes="form-control" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Visa Details:</legend>
              {this.state.isVisaAvailable ? (
                <>
                  <label>
                    {' '}
                    Country:{' '}
                    <Select
                      options={rawData.countries}
                      classes="form-control"
                    />
                  </label>
                  <label>
                    {' '}
                    Visa Number : <Input type="number" classes="form-control" />
                  </label>
                  <label>
                    {' '}
                    Expiry Date: <Input type="date" classes="form-control" />
                  </label>
                </>
              ) : (
                <h3>‘contact travel desk for visa formalities’ </h3>
              )}
            </fieldset>
         </>   }
          </form>
        </div>
      </div>
    );
  }
}

export default TNE;
