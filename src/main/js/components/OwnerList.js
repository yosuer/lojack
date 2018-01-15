import React from 'react';
import UpdateDialog from './UpdateDialog';
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    Label,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';

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

    handleDelete(owner) {
        this.props.onDelete(owner);
    }

    render() {
        let pageInfo = this.props.page.hasOwnProperty("number") ?
            <h3>Owners - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;
        let rowOwners = this.props.owners.map(owner =>
            <tr key={owner.entity._links.self.href}>
                <th scope="row">{owner.entity._links.self.href.split("/").pop()}</th>
                <td>{owner.entity.fullName}</td>
                <td>{owner.entity.phoneNumber}</td>
                <td>{owner.entity.address}</td>
                <td>{owner.entity.country}</td>
                <td>{owner.entity.manager.name}</td>
                <td>
                   <Row>
                        <UpdateDialog owner={owner}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate}>
                        </UpdateDialog>{' '}
                        <Button color="danger" onClick={this.handleDelete.bind(this, owner)}>Delete</Button>
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
                {pageInfo}
                <FormGroup row>
                    <Label for="inputPageSize" sm={1}>Page size</Label>
                    <Col sm={1}>
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
                        {rowOwners}
                    </tbody>
                </Table>
                <div>
                    <Pagination size="sm">
                        {navLinks}
                    </Pagination>
                </div>
            </div>

        )
    }
}