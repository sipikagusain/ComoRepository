import { Button, Grid, Icon, Paper } from '@material-ui/core';
import { Delete, Search } from '@material-ui/icons';
import React from 'react';
import EditableGrid from "../commonComponents/editableGrid";
import { TextFieldSB } from "../commonComponents/textFieldSB";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CheckboxSB } from '../commonComponents/checkBoxSB';

toast.configure()

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            filteredRecord: [],
            selectedIds: [],
            searchText: ""
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        try {
            fetch('http://localhost:3890/social-blade',
                {
                    method: 'GET',
                    //mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json'
                    },
                }).then(async result => {
                    const data = await result.json();
                    this.setState({ rows: data });
                });

        } catch (error) {

        }
    }
    handleSearchClick = (value) => {
        debugger;
        if (value != "") {
            var searchedData = this.state.rows.filter(x => x.DisplayName.toLowerCase().includes(value.toLowerCase()));
            this.setState({ filteredRecord: searchedData });
        }

        this.setState({ searchText: value })
    }

    handleUserAction = (userDataIds, actionType, isChecked) => {
        switch (actionType) {
            case 'delete':
                this.deleteUser(userDataIds);
            case 'select':
                this.selectUser(userDataIds, isChecked);
                break;
            case 'selectAll':
                this.selectAllUser(isChecked);
                break;
            default:
                break;
        }

    }

    deleteUser = (userDataIds) => {
        //let activeRecords = this.state.rows.filter((el) => !userDataIds.includes(el.id));

        try {
            fetch('http://localhost:3890/social-blade?id=' + userDataIds,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json'
                    },
                }).then(async result => {
                    await result.json();
                    if (result.status == 200) {
                        this.setState({ rows: [], filteredRecord: [], selectedIds: [], searchText: "" });
                        toast.success("The record has been deleted successfully!")
                        this.getData();
                    } else {
                        toast.error("There was some error while deleting!")
                    }
                });

        } catch (error) {

        }
    }

    selectUser = (userDataId, isChecked) => {
        let selectedIds = this.state.selectedIds;

        if (isChecked) {
            let selectedRecord = this.state.rows.find(x => x.id == userDataId);
            selectedIds.push(selectedRecord.id);
        }
        else {
            selectedIds = this.state.selectedIds.filter(x => x != userDataId);
        }

        this.setState({ selectedIds: selectedIds });
    }

    selectAllUser = (isChecked) => {
        let selectedRecordIds = [];
        if (isChecked) {
            selectedRecordIds = this.state.rows.map(x => x.id);
        }

        this.setState({ selectedIds: selectedRecordIds });
    }

    Action = (props) => {
        return <div>
            <Icon onClick={() => this.handleUserAction([props.row.id], 'delete')}><Delete /></Icon>
        </div>;
    }

    Select = (props) => {
        return <div>
            <CheckboxSB onChange={(data) => this.handleUserAction(props.row && props.row.id, props.isSelectAll ? 'selectAll' : 'select', data.target.checked)}>
            </CheckboxSB>
        </div >;
    }

    Columns = [
        {
            id: 'select', label: 'SELECT', minWidth: '80px', format: 'select'
        },
        {
            id: 'Rank', label: 'RANK', minWidth: '100px', align: 'left', sorting: true, propType: "pureNumber"
        },
        {
            id: 'Grade', label: 'GRADE', minWidth: '100px', sorting: true
        },
        {
            id: 'DisplayName', label: 'DISPLAY NAME', minWidth: '200px', sorting: true
        },
        {
            id: 'Videos', label: 'VIDEOS', minWidth: '100px', sorting: true, propType: "number"
        },
        {
            id: 'Subscriber', label: 'SUBSCRIBERS', minWidth: '100px', sorting: true, propType: "number"
        },
        {
            id: 'Views', label: 'VIEWS', minWidth: '100px', sorting: true, propType: "number"
        },
        {
            id: 'actions', label: 'Actions', minWidth: '80px', format: 'action'
        }
    ];

    render() {
        return <>
            <div>
                <h1>Welcome to Social Blade extracted data</h1>
                <Grid>
                    <div style={{ marginTop: "30px" }}>
                        <Grid container item md={12}>
                            <Grid item md={4}>
                                <div style={{ float: "left" }}>
                                    <TextFieldSB id="standard-search"
                                        value={this.state.searchText}
                                        disabled={this.state.selectedIds.length > 0}
                                        onChange={(event) => { this.handleSearchClick(event.target.value) }}
                                        placeholder="View By Display Name" />
                                    <Icon><Search /></Icon>
                                </div>
                            </Grid>
                            <Grid item md={5} ></Grid>
                            <Grid item md={3} >
                                <div>
                                    <Button
                                        variant={"outlined"}
                                        color={"primary"}
                                        disabled={this.state.selectedIds.length <= 1}
                                        onClick={() => this.handleUserAction(this.state.selectedIds, 'delete')}> Delete Multiple Records </Button>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                    <Grid item md={12} >
                        <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}>
                            <Paper>
                                <EditableGrid
                                    rows={this.state.searchText == "" ? this.state.rows : this.state.filteredRecord}
                                    columns={this.Columns}
                                    actionComponent={this.Action}
                                    selectComponent={this.Select}
                                    isPaginationRequired={true} />
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    }
}

export default UserList;