import React, { Component } from 'react';
import Input from '../components/inputType';
import Select from '../components/Select';
import rawData from '../rawData';
import axios from 'axios';
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
  addTNE = e => {
    e.preventDefault();
    let travelType=e.target.travelType.value;
    const obj = {
      employeeName: e.target.employeeName.value,
      designation: e.target.designation.value,
      travelType: travelType,
      bookingType: e.target.bookingType.value,
      businessPurpose: e.target.businessPurpose.value,
      purposeOfTravel: e.target.purposeOfTravel.value,
      departureDate: e.target.departureDate.value,
      departureTime: e.target.departureTime.value,
      fromCity: e.target.fromCity.value,
      toCity: e.target.toCity.value,
      travelMode: e.target.travelMode.value,
      travelClass: e.target.travelClass.value,
      cabType: e.target.cabType.value,
      cabPurpose: e.target.cabPurpose.value,
      nightsStayCount: e.target.nightsStayCount.value,
      stayHotelName: e.target.stayHotelName.value,
      costCentre: e.target.costCentre.value,
      budget: e.target.budget.value,
      currencyRequest: travelType==='I' && e.target.currencyRequest.value,
      currency: travelType==='I' && e.target.currency.value,
      amount: travelType==='I' && e.target.amount.value,
      passportDetails: travelType==='I' && {
        name_on_passport: e.target.name_on_passport.value,
        email_on_passport: e.target.email_on_passport.value,
        dob_on_passport: e.target.dob_on_passport.value
      },
     visaDetails: travelType==='I' && {
        visa_country: e.target.visa_country.value,
        visa_number: e.target.visa_number.value,
        expiry_date: e.target.expiry_date.value
      }
    };
    console.log(obj);

    axios
      .post('http://5e0e159536b80000143dbaa8.mockapi.io/TNE/', obj)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <div className="container">
          <h3 className="p-3 text-center">TNE FORM</h3>
          <form className="form-horizontal" onSubmit={this.addTNE}>
            <div className="row ">
              <div className="col">
                <Input
                  placeholder="Employee name"
                  type="text"
                  classes="form-control "
                  name="employeeName"
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
                  name="travelType"
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
                  name="travelType"
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
                  name="bookingType"
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
                  name="bookingType"
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
                  name="businessPurpose"
                />
              </div>
              <div className="col">
                <textarea
                  placeholder="Purpose of travel"
                  className="form-control"
                  name="purposeOfTravel"
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
                    name="departureDate"
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
                    name="departureTime"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  From City
                  <Select
                    options={rawData.cities}
                    classes="form-control"
                    name="fromCity"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  To City
                  <Select
                    options={rawData.cities}
                    classes="form-control"
                    name="toCity"
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
                    name="travelMode"
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
                    name="travelClass"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cab type
                  <Select
                    options={rawData.cabTypes}
                    classes="form-control"
                    name="cabType"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cab Purpose
                  <Select
                    options={rawData.cabPurpose}
                    classes="form-control"
                    name="cabPurpose"
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
                    name="nightsStayCount"
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
                    name="stayHotelName"
                  />
                </label>
              </div>
              <div className="col">
                <label>
                  Cost Centre
                  <Select
                    options={rawData.cabTypes}
                    classes="form-control"
                    name="costCentre"
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
                        name="currencyRequest"
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
