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
        let updatedOwner = {};
        this.props.attributes.forEach(attribute =>
            updatedOwner[attribute] = this['input-'+attribute].value.trim()
        );
        this.props.onUpdate(this.props.owner, updatedOwner);
        this.setState({modal: false})
    }

    render() {
        let inputs = this.props.attributes.map(attribute =>
            <FormGroup key={this.props.owner.entity[attribute]} row>
                <Label for={'input-' + attribute} sm={3}>{attribute}</Label>
                <Col sm={8}>
                    <Input innerRef={(input) => this['input-'+attribute] = input}
                           defaultValue={this.props.owner.entity[attribute]}
                           id={'input-' + attribute} placeholder={attribute}/>
                </Col>
            </FormGroup>
        );

        return (
            <div>
                <Button color="secondary" onClick={this.toggle}>Update</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update an owner</ModalHeader>
                    <ModalBody>{inputs}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit} color="success">Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

};