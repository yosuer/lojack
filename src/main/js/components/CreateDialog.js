import React from 'react';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default class CreateDialog extends React.Component {

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
        let newItem = {};
        let attrs = Object.keys(this.props.attributes)
            .filter(attribute => {
                return this.props.attributes[attribute].type !== 'object'
            });

        attrs.forEach(attribute => newItem[attribute] = this['input-'+attribute].value.trim());
        this.props.onCreate(newItem);
        attrs.forEach(attribute => this['input-' + attribute].value = '');

        this.setState({
            modal: false
        });
    }

    render() {
        let attrs = this.props.attributes;
        let inputs = Object.keys(attrs)
            .filter(attribute => {
                return this.props.attributes[attribute].type !== 'object'
            }).map(attribute =>
                <FormGroup key={attribute} row>
                    <Label for={'input-' + attribute} sm={3}>{attrs[attribute].description}</Label>
                    <Col sm={8}>
                        <Input innerRef={(input) => this['input-'+attribute] = input}
                               id={'input-' + attribute} placeholder={attrs[attribute].description}/>
                    </Col>
                </FormGroup>
            );

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Create</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create an item</ModalHeader>
                    <ModalBody>{inputs}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit} color="success">Create</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}