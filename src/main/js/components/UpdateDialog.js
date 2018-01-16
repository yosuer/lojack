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
        this.props.attributes.forEach(attribute =>
            updatedItem[attribute.title] = this['input-'+attribute.title].value.trim()
        );
        this.props.onUpdate(this.props.item, updatedItem);
        this.setState({modal: false})
    }

    render() {
        let attrs = this.props.attributes;
        let inputs = Object.keys(attrs).map(attribute =>
            <FormGroup key={attrs[attribute].title + this.props.item.entity[attrs[attribute].title]} row>
                <Label for={'input-' + attrs[attribute].title} sm={3}>{attrs[attribute].description}</Label>
                <Col sm={8}>
                    <Input innerRef={(input) => this['input-'+attrs[attribute].title] = input}
                           defaultValue={this.props.item.entity[attrs[attribute].title]}
                           id={'input-' + attrs[attribute].title}/>
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