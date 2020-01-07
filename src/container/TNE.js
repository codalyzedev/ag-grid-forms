import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import rawData from '../rawData';
import Input from '../components/inputType';
import axios from 'axios';
class TNE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      rowData: [],
      defaultColDef: {
        editable: true,
        resizable: true,
        suppressSizeToFit: false
      },
      frameworkComponents: {
        INPUT: Input
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
            cellRenderer: 'INPUT',
            cellRendererParams: {
              type: 'date'
            },
            editable: false,
            suppressSizeToFit: true
          },
          {
            headerName: 'Time',
            field: 'departureTime',
            cellRenderer: 'INPUT',
            cellRendererParams: {
              type: 'time'
            }
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
            field: 'toCity',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: this.state.cityList
            }
          }
        ]
      },
      {
        headerName: 'Travel *',
        children: [
          {
            headerName: 'Mode',
            field: 'travelMode',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: rawData.travelMode
            }
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
            field: 'arrival_date',
            cellRenderer: params =>
              `<input type="date" value=${params.value} />`,
            editable: false,
            suppressSizeToFit: true
          }
        ]
      },
      {
        headerName: 'Cab *',
        children: [
          {
            headerName: 'Type',
            field: 'cabType',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: rawData.cabTypes
            }
          },
          {
            headerName: 'cabPurpose',
            field: 'cabPurpose',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: rawData.cabPurpose
            }
          }
        ]
      },
      {
        headerName: 'Stay *',
        children: [
          {
            headerName: 'Duration',
            field: 'duration',
            onCellValueChanged: this.durationChange
          },
          {
            headerName: 'City',
            field: 'stayCity',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: this.state.cityList
            }
          },
          {
            headerName: 'Hotel',
            field: 'stayHotelName',
            editable: params => 
            
              params.data.duration === "0" ? false : true
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
    axios
      .get('http://5e0e159536b80000143dbaa8.mockapi.io/TNE/')
      .then(response => {
        this.setState({ rowData: response.data }, () => {
          this.gridApi.sizeColumnsToFit();
        });
      });
  };
  durationChange = params => {
    console.log(params.newValue);
    if (isNaN(params.newValue)) {
      let newItem = (params.data.duration = '');
      this.gridApi.updateRowData({ newItem });
    }
  };
  onAddRow = () => {
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
  };
  componentDidMount() {
    axios
      .get('http://5e0e159536b80000143dbaa8.mockapi.io/cities/')
      .then(response => {
        console.log(response.data);
        let cities = response.data.map(data => data.city);
        this.setState({ cityList: cities }, () => {
          this.gridApi.sizeColumnsToFit();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <button onClick={this.onAddRow}>Add Row</button>
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
