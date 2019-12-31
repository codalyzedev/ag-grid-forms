import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import GenderCellRenderer from './components/genderCellRenderer'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", cellRenderer:  function(params) {
          // put the value in bold
          return '<b>'+params.value+'</b>';
      },
      }, {
        field: "gender",
        width: 90,
        cellRenderer: "genderCellRenderer",
        cellEditor: "agRichSelectCellEditor",
        cellEditorParams: {
          values: ["Male", "Female"],
          cellRenderer: "genderCellRenderer"
        }
      }, {
        headerName: "Price", field: "price"
      }],
      rowData: [{
        make: "Toyota", gender: "Male", price: 35000
      }, {
        make: "Ford", gender: "Female", price: 32000
      }, {
        make: "Porsche", gender: "Male", price: 72000
      }],
      frameworkComponents: { genderCellRenderer: GenderCellRenderer }
      ,
      defaultColDef: {
        editable: true,
        resizable: true
      },
    }
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '600px' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          frameworkComponents={this.state.frameworkComponents}
          defaultColDef={this.state.defaultColDef}>
        </AgGridReact>
      </div>
    );
  }
}

export default App;