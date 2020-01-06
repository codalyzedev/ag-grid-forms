import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import GenderCellRenderer from '../components/genderCellRenderer';
import axios from 'axios';
class TNE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      rowData: [
        {
          departureDate: '2020-01-06',
          departureTime: '13:00',
          fromCity: 'Savionfurt',
          toCity: 'Mumbai',
          travelMode: 'train',
          travelClass: 'economy',
          cabType: 'normal',
          cabPurpose: 'normal',
          nightsStayCount: '',
          stayHotelName: '',
          costCentre: 'normal',
          budget: 'normal',
          currencyRequest: 'currencyRequest 1',
          currency: 'currency 1',
          amount: 53,
          passportDetails: {},
          visaDetails: {}
        },
        {
          departureDate: '2020-01-06',
          departureTime: '',
          fromCity: 'Mumbai',
          toCity: 'Mumbai',
          travelMode: 'train',
          travelClass: 'economy',
          cabType: 'normal',
          cabPurpose: 'normal',
          nightsStayCount: '',
          stayHotelName: '',
          costCentre: 'normal',
          budget: 'normal',
          currencyRequest: false,
          currency: false,
          amount: false,
          passportDetails: false,
          visaDetails: false
        }
      ],
      frameworkComponents: { genderCellRenderer: GenderCellRenderer },
      defaultColDef: {
        editable: true,
        resizable: true
      }
    };
  }

  getColumns = () => {
    const columnDefs = [
      {
        headerName: 'Departure *',
        children: [
          {
            headerName: 'Date',
            field: 'departureDate',
            cellRenderer: params =>
              `<input type="date" value=${params.value} />`,
            editable: false
          },
          {
            headerName: 'Time',
            field: 'departureTime',
            cellRenderer: params =>
              `<input type="time" value=${params.value} />`
          }
        ]
      },
      {
        headerName: 'City *',
        children: [
          {
            headerName: 'From',
            field: 'fromCity',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: this.state.cityList
            }
          },
          {
            headerName: 'To',
            field: 'toCity'
          }
        ]
      },
      {
        headerName: 'Travel *',
        children: [
          {
            headerName: 'Mode',
            field: 'travelMode',
            checkboxSelection: true,
            onCellValueChanged: param => console.log(param)
          },
          {
            headerName: 'Class',
            field: 'travelClass'
          }
        ]
      },
      {
        headerName: 'Arrival *',
        children: [
          {
            headerName: 'Date',
            field: 'arrival_date'
          }
        ]
      },
      {
        headerName: 'Stay *',
        children: [
          {
            headerName: 'Duration',
            field: 'duration'
          },
          {
            headerName: 'City',
            field: 'stayCity'
          },
          {
            headerName: 'Hotel',
            field: 'stayHotelName'
          }
        ]
      },
      {
        headerName: 'Expense Booking *',
        children: [
          {
            headerName: 'Cost Centre',
            field: 'costCentre'
          },
          {
            headerName: 'Budget',
            field: 'budget'
          }
        ]
      }
    ];
    return columnDefs;
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onAddRow() {
    let lastRowIndex = this.gridApi.getLastDisplayedRow();
    let lastRow = this.gridApi.getDisplayedRowAtIndex(lastRowIndex);
    let error = false;
    if (lastRow) {
      error = lastRow.data.departureDate === '' ? true : false;
    }
    if (error) {
      alert('please fill the last row details');
      return;
    }
    let newItem = createNewRowData();
  this.gridApi.updateRowData({ add: [newItem] });
  
  }
  componentDidMount() {
    axios
      .get('http://5e0e159536b80000143dbaa8.mockapi.io/cities/')
      .then(response => {
        console.log(response.data);
        let cities = response.data.map(data => data.city);
        this.setState({ cityList: cities });
      })
      .catch(error => {
        console.log(error);
      });
    //this.setState({})
  }

  render() {
    console.log(this.state);

    return (
      <>
        <button onClick={this.onAddRow.bind(this)}>Add Row</button>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100%'
          }}
        >
          <AgGridReact
            columnDefs={this.getColumns()}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          ></AgGridReact>
        </div>
      </>
    );
  }
}

function createNewRowData() {
  var newData = {
    departureDate: '',
    departureTime: '',
    fromCity: '',
    toCity: '',
    travelMode: '',
    travelClass: '',
    stayCity: '',
    stayHotelName: '',
    costCentre: '',
    budget: ''
  };

  return newData;
}

export default TNE;
