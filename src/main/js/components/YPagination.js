import React from 'react';
import {Col, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class YPagination extends React.Component{

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
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

    render() {
        console.log('render YPagination');
        let pageInfo = this.props.page.hasOwnProperty("number") ?
            <h4>Page {this.props.page.number + 1} of {this.props.page.totalPages}</h4> : null;

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
            <FormGroup row>
                <Col xs={3}>
                    <Pagination size="sm">
                        {navLinks}
                    </Pagination>
                </Col>
                <Col xs={{size: 3, offset: 2}}>{pageInfo}</Col>
                <Label for="inputPageSize" xs={{size: 1, offset: 2}}>Mostrando</Label>
                <Col xs={1}>
                    <Input innerRef={(input) => this.inputPageSize = input}
                           type="select" name="select" id="inputPageSize" onChange={this.handleInput}>
                        <option>5</option>
                        <option>10</option>
                        <option>30</option>
                    </Input>
                </Col>
            </FormGroup>
        )
    }
}