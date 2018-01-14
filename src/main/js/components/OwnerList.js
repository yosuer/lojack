import React from 'react';
import ReactDOM from 'react-dom';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import UpdateDialog from './UpdateDialog'
import RaisedButton from 'material-ui/RaisedButton';

export default class OwnerList extends React.Component{

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        let pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }

    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    handleDelete(owner) {
        this.props.onDelete(owner);
    }

    render() {
        let pageInfo = this.props.page.hasOwnProperty("number") ?
            <h3>Owners - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;
        let rowOwners = this.props.owners.map(owner =>
            <TableRow key={owner.entity._links.self.href}>
                <TableRowColumn>{owner.entity.fullName}</TableRowColumn>
                <TableRowColumn>{owner.entity.phoneNumber}</TableRowColumn>
                <TableRowColumn>{owner.entity.address}</TableRowColumn>
                <TableRowColumn>{owner.entity.country}</TableRowColumn>
                <TableRowColumn>{owner.entity.manager.name}</TableRowColumn>
                <TableRowColumn>
                    <UpdateDialog owner={owner}
                                  attributes={this.props.attributes}
                                  onUpdate={this.props.onUpdate}>
                    </UpdateDialog>
                    <RaisedButton onClick={this.handleDelete.bind(this, owner)} label="Delete" secondary={true}/>
                </TableRowColumn>
            </TableRow>
        );

        let navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                {pageInfo}
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>FullName</TableHeaderColumn>
                            <TableHeaderColumn>PhoneNumber</TableHeaderColumn>
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableHeaderColumn>Country</TableHeaderColumn>
                            <TableHeaderColumn>Manager</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rowOwners}
                    </TableBody>
                </Table>
                <div>
                    {navLinks}
                </div>
            </div>

        )
    }
}