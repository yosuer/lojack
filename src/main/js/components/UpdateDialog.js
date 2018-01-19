import React from 'react';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {modal: false};
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let updatedItem = {};
        let attrs = this.props.attributes;

        Object.keys(attrs)
            .filter(attribute => {
                return typeof this.props.item.entity[attribute] !== 'object'
            }).forEach(attribute => {
                updatedItem[attribute] = this['input-'+attribute].value.trim()
            });
        this.props.onUpdate(this.props.item, updatedItem);
        this.setState({modal: false})
    }

    render() {
        let attrs = this.props.attributes;
        let inputs = Object.keys(attrs)
            .filter(attribute => {
                return typeof this.props.item.entity[attribute] !== 'object'
            }).map(attribute =>
                <FormGroup key={attribute + this.props.item.entity[attribute]} row>
                    <Label for={'input-' + attribute} sm={3}>{attrs[attribute].description}</Label>
                    <Col sm={8}>
                        <Input innerRef={(input) => this['input-'+attribute] = input}
                               defaultValue={this.props.item.entity[attribute]}
                               id={'input-' + attribute}/>
                    </Col>
                </FormGroup>
            );

        return (
            <div>
                <Button color="secondary" onClick={this.toggle}>Update</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update an item</ModalHeader>
                    <ModalBody>{inputs}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit} color="success">Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

};