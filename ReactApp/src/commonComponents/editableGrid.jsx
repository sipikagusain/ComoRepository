import { Table, TableCell, TableContainer, TableHead, TablePagination, TableSortLabel } from '@material-ui/core';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { SortableList } from './sortableList';
import { sortArray } from '../utils/commonFunction';

const EditableGridProps = {
    rows: [],
    columns: [],
    tableHeight: '100%',
    onChange: null,
    sortable: true,
    controlTable: false,
    action: null
}
const pageSize = 25;
class EditableGrid extends React.Component {
    constructor(props = EditableGridProps) {
        super(props);
        this.state = {
            count: 0,
            page: 0,
            rowsPerPage: pageSize,
            columnSortIdentifier: {},
            tableRows: [...this.props.rows] || []
        };

        this.state.count = this.state.tableRows.length;
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };


    handleColumnSort = (columnId, propType) => {
        let columnSortIdentifier = { [columnId]: '' };
        if (!this.state.columnSortIdentifier[columnId]) {
            columnSortIdentifier[columnId] = 'asc';
        }
        else if (this.state.columnSortIdentifier[columnId] === 'asc') {
            columnSortIdentifier[columnId] = 'desc'
        }
        else {
            columnSortIdentifier = {};
        }
        if (columnSortIdentifier[columnId]) {
            let direction = columnSortIdentifier[columnId]
            this.state.tableRows = sortArray(this.state.tableRows, direction, columnId, propType)
        }
        else {
            this.state.tableRows = [...this.props.rows];
        }
        this.setState({ columnSortIdentifier: columnSortIdentifier })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tableRows: nextProps.rows, page: 0,
            rowsPerPage: pageSize, count: (nextProps.rows || []).length
        });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 });
    };

    onDataChange = () => {
        if (this.props.onChange && typeof this.props.onChange === 'function')
            this.props.onChange(this.state.tableRows);
    }

    generateTableRows = () => {
        const Action = this.props.actionComponent;
        const Select = this.props.selectComponent;
        let rows = this.state.tableRows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {
            return (
                <React.Fragment key={index}>
                    {this.props.columns.map((column) => {
                        let value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align} >
                                {(column.format === 'action' ? <Action row={row} /> :
                                    column.format === 'select' ? <Select row={row}></Select> : value)}
                            </TableCell>

                        );
                    })}
                </React.Fragment>
            )
        });
        return [...rows];
    }
    render() {
        const Select = this.props.selectComponent;
        return (
            <>
                <TableContainer style={{ maxHeight: this.props.tableHeight }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow style={{ maxHeight: '4px' }}>
                                {this.props.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {
                                            column.sorting ?
                                                <TableSortLabel
                                                    active={this.state.columnSortIdentifier[column.id]}
                                                    direction={this.state.columnSortIdentifier[column.id] || 'asc'}
                                                    onClick={() => this.handleColumnSort(column.id, column.propType)}
                                                >
                                                    {column.label}

                                                </TableSortLabel>
                                                // : column.format == "select" ?
                                                //     <Select rows={null} isSelectAll={true}></Select>
                                                    : column.label
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {Array.isArray(this.props.rows) &&
                            <SortableList
                                items={this.generateTableRows()} />}
                    </Table>

                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    count={this.state.count}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </>
        );

    }
}

export default EditableGrid;