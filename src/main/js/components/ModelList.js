import React from 'react';
import UpdateDialog from './UpdateDialog';
import CreateDialog from './CreateDialog';

import {Button, Col, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table} from 'reactstrap';

export default class ModelList extends React.Component{

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
        let pageSize = this.inputPageSize.value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            this.inputPageSize.value = pageSize.substring(0, pageSize.length - 1);
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

    handleDelete(item) {
        this.props.onDelete(item);
    }

    render() {
        let attrs = this.props.attributes;
        let pageInfo = this.props.page.hasOwnProperty("number") ?
            <h3>Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;
        let rowItems = this.props.items.map(item =>
            <tr key={item.entity._links.self.href}>
                <th scope="row">{item.entity._links.self.href.split("/").pop()}</th>
                <td>{item.entity.fullName}</td>
                <td>{item.entity.phoneNumber}</td>
                <td>{item.entity.address}</td>
                <td>{item.entity.country}</td>
                <td>{item.entity.manager.name}</td>
                <td>
                   <Row>
                        <UpdateDialog item={item}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate}>
                        </UpdateDialog>{' '}
                        <Button color="danger" onClick={this.handleDelete.bind(this, item)}>Delete</Button>
                    </Row>
                </td>
            </tr>
        );

        let navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(
                <PaginationItem key="first">
                    <PaginationLink previous onClick={this.handleNavFirst}>&lt;&lt;</PaginationLink>
                </PaginationItem>
            );
        }
        if ("prev" in this.props.links) {
            navLinks.push(
                <PaginationItem key="prev">
                    <PaginationLink previous onClick={this.handleNavPrev} />
                </PaginationItem>
            );
        }
        if ("next" in this.props.links) {
            navLinks.push(
                <PaginationItem key="next">
                    <PaginationLink next onClick={this.handleNavNext} />
                </PaginationItem>
            );
        }
        if ("last" in this.props.links) {
            navLinks.push(
                <PaginationItem key="last">
                    <PaginationLink previous onClick={this.handleNavLast}>&gt;&gt;</PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <div>
                <FormGroup row>
                    <CreateDialog attributes={this.props.attributes} onCreate={this.props.onCreate}/>
                    <Label for="inputPageSize" xs={{size: 1, offset: 9}}>Show</Label>
                    <Col xs={1}>
                        <Input innerRef={(input) => this.inputPageSize = input}
                               type="select" name="select" id="inputPageSize" onChange={this.handleInput}>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </Input>
                    </Col>
                </FormGroup>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>FullName</th>
                            <th>PhoneNumber</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Manager</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowItems}
                    </tbody>
                </Table>
                <Row>
                    <Col xs="3">{pageInfo}</Col>
                    <Col xs={{size: 2, offset:7}}>
                        <Pagination size="sm">
                            {navLinks}
                        </Pagination>
                    </Col>
                </Row>
            </div>

        )
    }
}