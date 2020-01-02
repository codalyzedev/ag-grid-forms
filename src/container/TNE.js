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
        <div className="container">
          <form className="form-horizontal">
            <div className="row ">
              <div className="col">
                <Input
                  placeholder="Employee name"
                  type="text"
                  classes="form-control "
                  name="employee_name"
                />
              </div>
              <div className="col">
                <Input
                  placeholder="Designation"
                  type="text"
                  classes="form-control "
                  name="designation"
                />
              </div>
            </div>
            <div className="d-flex">
              <label>
                <Input
                  type="radio"
                  name="travel-type"
                  value="D"
                  classes="ml-3 pl-2"
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
                  classes="ml-3 pl-2"
                  onChange={this.changeTravelType}
                />
                International travel
              </label>
            </div>
            <div className="d-flex">
              <label>
                <Input
                  type="radio"
                  name="booking-type"
                  value="TA"
                  classes="ml-3 pl-2"
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
                  classes="ml-3 pl-2"
                  onChange={this.changeBookingType}
                />
                Self Booking
              </label>
            </div>
            <div className="row ">
              <div className="col">
                <Input
                  placeholder="Business purpose"
                  type="text"
                  classes="form-control"
                  name="business_purpose"
                />
              </div>
              <div className="col">
                <textarea
                  placeholder="Purpose of travel"
                  className="form-control"
                  name="purpose_of_travel"
                ></textarea>
              </div>
            </div>
            <div className="row ">
              <div className="col">
                <label>
                  Departure date
                  <Input
                    placeholder="Business purpose"
                    type="date"
                    classes="form-control"
                    name="departure_date"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Departure time
                  <Input
                    placeholder="Business purpose"
                    type="time"
                    classes="form-control"
                    name="departure_time"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  From City
                  <Select
                    options={rawData.cities}
                    classes="form-control"
                    name="from_city"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  To City
                  <Select
                    options={rawData.cities}
                    classes="form-control"
                    name="to_city"
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>
                  Travel Mode
                  <Select
                    options={rawData.travelMode}
                    classes="form-control"
                    name="travel_mode"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Class
                  <Input
                    disabled="disabled"
                    value="economy"
                    type="text"
                    classes="form-control"
                    name="travel_class"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cab type
                  <Select
                    options={rawData.cabTypes}
                    classes="form-control"
                    name="cab_type"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cab Purpose
                  <Select
                    options={rawData.cabPurpose}
                    classes="form-control"
                    name="cab_purpose"
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>
                  Number of nights stay in hotel
                  <Input
                    type="number"
                    classes="form-control"
                    onChange={this.isStayZero}
                    name="nights_stay_count"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Name of hotel
                  <Input
                    type="text"
                    classes="form-control"
                    passRef={ref => (this.nameOfHotel = ref)}
                    name="stay_hotel_name"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cost Centre
                  <Select
                    options={rawData.cabTypes}
                    classes="form-control"
                    name="cost_centre"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Budget
                  <Select
                    options={rawData.cabPurpose}
                    classes="form-control"
                    name="budget"
                  />
                </label>
              </div>
            </div>
            {this.state.isTravelTypeChanged && (
              <>
                <div className="row">
                  <div className="col-3">
                    <label>
                      Currency request(Forex):
                      <Input
                        type="text"
                        classes="form-control"
                        name="currency_request"
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label>
                      Currency
                      <Select
                        options={rawData.currency}
                        classes="form-control"
                        name="currency"
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label>
                      Amount:
                      <Input
                        type="number"
                        classes="form-control"
                        name="amount"
                      />
                    </label>
                  </div>
                </div>
                <fieldset className="border p-4">
                  <legend className="w-auto">Passport Details:</legend>
                  <div className="row">
                    <div className="col-3">
                      <label>
                        Name:{' '}
                        <Input
                          type="text"
                          classes="form-control"
                          name="name_on_passport"
                        />
                      </label>
                    </div>
                    <div className="col-3">
                      <label>
                        Email id:{' '}
                        <Input
                          type="email"
                          classes="form-control"
                          name="email_on_passport"
                        />
                      </label>
                    </div>
                    <div className="col-3">
                      <label>
                        DOB:{' '}
                        <Input
                          type="date"
                          classes="form-control"
                          name="dob_on_passport"
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border p-4">
                  <legend className="w-auto">Visa Details:</legend>
                  {this.state.isVisaAvailable ? (
                    <>
                      <div className="row">
                        <div className="col-3">
                          <label>
                            Country:{' '}
                            <Select
                              options={rawData.countries}
                              classes="form-control"
                              name="visa_country"
                            />
                          </label>
                        </div>
                        <div className="col-3">
                          <label>
                            Visa Number :{' '}
                            <Input
                              type="number"
                              classes="form-control"
                              name="visa_number"
                            />
                          </label>
                        </div>
                        <div className="col-3">
                          <label>
                            Expiry Date:{' '}
                            <Input
                              type="date"
                              classes="form-control"
                              name="expiry_date"
                            />
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <h3>‘contact travel desk for visa formalities’ </h3>
                  )}
                </fieldset>
              </>
            )}
            <Input type="submit" classes="btn btn-success w-25 mb-3" />
          </form>
        </div>
      </div>
    );
  }
}

export default TNE;
