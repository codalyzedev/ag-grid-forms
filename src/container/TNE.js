import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import Input from "../components/inputType";
import SaveOrRevert from "../components/saveOrRevert";
import axios from "axios";
import {
	cabPurpose,
	cabTypes,
	budgetCodes,
	costCenters,
	travelModes,
	travelClasses,
	departure
} from "../master-data";
class TNE extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modules: AllModules,
			cityList: [],
			saveButtonOptions: [],
			rowData: [],
			defaultColDef: {
				editable: true,
				resizable: true,
				suppressSizeToFit: false
			},
			frameworkComponents: {
				INPUT: Input,
				SaveOrRevert
			},
			domLayout: "autoHeight",
			rowSelection: "multiple",
			rowClassRules :{
				'modified' : this.isEditedRow()
			 }

		};
		this.copyOfOldRows = [];
	}

	 isEditedRow() {
		return (params) => {
		   return params.data.edited;
		}
	 }

	getColumns = () => {
		const columnDefs = [
			{
				headerName: departure.headerName,
				children: [
					{
						headerName: departure.departureDate.headerName,
						field: departure.departureDate.field,
						cellRenderer: "INPUT",
						cellRendererParams: {
							type: "date",
							onCellValueChanged: this.onCellValueChanged
						},

						suppressSizeToFit: true
					},
					{
						headerName: departure.departureTime.headerName,
						field: departure.departureTime.field,
						cellRenderer: "INPUT",
						cellRendererParams: {
							type: "time",
							onCellValueChanged: this.onCellValueChanged
						}
					}
				]
			},
			{
				headerName: "City *",
				children: [
					{
						headerName: "From",
						field: "fromCity",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: this.state.cityList
						}
					},
					{
						headerName: "To",
						field: "toCity",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: this.state.cityList
						}
					}
				]
			},
			{
				headerName: "Travel *",
				children: [
					{
						headerName: "Mode",
						field: "travelMode",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: travelModes.map(travelMode => travelMode.displayValue)
						}
					},
					{
						headerName: "Class",
						field: "travelClass",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: travelClasses
						}
					}
				]
			},
			{
				headerName: "Arrival *",
				children: [
					{
						headerName: "Date",
						field: "arrivalDate",
						cellRenderer: "INPUT",
						cellRendererParams: {
							type: "date",
							onCellValueChanged: this.onCellValueChanged
						},

						suppressSizeToFit: true
					}
				]
			},
			{
				headerName: "Cab *",
				children: [
					{
						headerName: "Type",
						field: "cabType",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: cabTypes
						}
					},
					{
						headerName: "cabPurpose",
						field: "cabPurpose",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: cabPurpose
						}
					}
				]
			},
			{
				headerName: "Stay *",
				children: [
					{
						headerName: "Duration",
						field: "duration",
						onCellValueChanged: this.durationChange
					},
					{
						headerName: "City",
						field: "stayCity",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: this.state.cityList
						}
					},
					{
						headerName: "Hotel",
						field: "stayHotelName",
						editable: params => (params.data.duration === "0" ? false : true)
					}
				]
			},
			{
				headerName: "Expense Booking *",
				children: [
					{
						headerName: "Cost Centre",
						field: "costCentre",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: costCenters
						}
					},
					{
						headerName: "Budget",
						field: "budget",
						cellEditor: "agSelectCellEditor",
						cellEditorParams: {
							values: budgetCodes
						}
					}
				]
			},
			{
				headerName: "Action",
				field: "action",
				pinned: "right",
				colId: "22",
				width: 300,
				editable: false,
				cellRenderer: "SaveOrRevert",
				cellRendererParams: {
					onRevertRowClick: this.onRevertRowClick,
					onSaveClick: this.onSaveClick
				}
			}
		];
		return columnDefs;
	};

	onGridReady = async params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		axios
			.get("http://5e0e159536b80000143dbaa8.mockapi.io/TNE/")
			.then(response => {
				response.data = response.data.map(res => Object.assign(res));
				//console.log(response)
				this.setState({ rowData: response.data }, () => {
					this.gridApi.sizeColumnsToFit();
				});
			});
	};
	durationChange = params => {
		// console.log(params.newValue);
		if (isNaN(params.newValue)) {
			let newItem = (params.data.duration = "");
			this.gridApi.updateRowData({ newItem });
		}
	};

	onAddRow = () => {
		let lastRowIndex = this.gridApi.getLastDisplayedRow();

		let lastRow = this.gridApi.getDisplayedRowAtIndex(lastRowIndex);
		let error = false;
		if (lastRow) {
			error = lastRow.data.departureDate === "" ? true : false;
		}
		if (error) {
			alert("please fill the last row details");
			return;
		}
		let newItem = createNewRowData();
		this.gridApi.updateRowData({ add: [newItem] });
	};
	keydownHandler = e => {
		if (e.key === "b" && e.ctrlKey) {
			let newItem = createNewRowData();
			this.gridApi.updateRowData({ add: [newItem] });
		}
	};
	componentDidMount() {
		document.addEventListener("keydown", this.keydownHandler);
		axios
			.get("http://5e0e159536b80000143dbaa8.mockapi.io/cities/")
			.then(response => {
				// console.log(response.data);
				let cities = response.data.map(data => data.city);
				this.setState({ cityList: cities }, () => {
					this.gridApi.sizeColumnsToFit();
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	getButton = params => {
		if (this.state.saveButtonOptions) {
			let rowData = this.state.saveButtonOptions.find(
				row => row.rowIndex === params.rowIndex
			);
			// console.log(rowData, this.state)
			if (rowData) {
				// console.log('header1')
				this.createButton(rowData);
			}
		}
	};

	onRevertRowClick = params => {
		console.log(params, this.copyOfOldRows);
		params.data.state = "clean";
		let id = params.data.id;
		let rowData = this.copyOfOldRows.filter(row => id === row.id);
		let rowNode = this.gridApi.getRowNode(params.rowIndex);
		rowNode.data = { ...rowData[0] };
		console.log(rowNode);
		this.gridApi.updateRowData({ update: [rowNode.data] });
		this.gridApi.redrawRows({ rowNodes: [params.node] });
  };
  onSaveClick = params => {
		console.log(params);

	};

	onCellValueChanged = e => {
		console.log(e);
		let colName = e.colDef.field;
		let copyData = JSON.parse(JSON.stringify(e.data));
		copyData[colName] = e.oldValue;
		
		this.copyOfOldRows = [...this.copyOfOldRows, { ...copyData }];
		if (e.oldValue !== e.newValue) {
				
			e.data.state = "save";
			e.data.edited = true;
			
			//console.log([e.data]);
			this.gridApi.updateRowData({ update: [e.data] });
			this.gridApi.redrawRows({ rowNodes: [e.node] });
		}
	};


	render() {
		let getCols = this.getColumns();

		return (
			<div style={{ height: "100%" }}>
				<div
					style={{ height: "calc(100% - 25px)" }}
					className="ag-theme-balham"
				>
					<div
						style={{
							height: "100%",
							width: "100%"
						}}
					>
						<AgGridReact
							modules={this.state.modules}
							columnDefs={getCols}
							rowData={this.state.rowData}
							frameworkComponents={this.state.frameworkComponents}
							defaultColDef={this.state.defaultColDef}
							onGridReady={this.onGridReady}
							domLayout={this.state.domLayout}
							onCellValueChanged={this.onCellValueChanged}
							rowSelection={this.state.rowSelection}
							enableRangeSelection={true}
							rowClassRules={this.state.rowClassRules}
						/>
						<button onClick={this.onAddRow}>Add Row</button>
					</div>
				</div>
			</div>
		);
	}
}

function createNewRowData() {
	var newData = {
		departureDate: "",
		departureTime: "",
		fromCity: "",
		toCity: "",
		travelMode: "",
		travelClass: "",
		stayCity: "",
		stayHotelName: "",
		costCentre: "",
		budget: ""
	};

	return newData;
}

export default TNE;
