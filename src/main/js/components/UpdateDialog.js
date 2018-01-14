import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {open: false};
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    handleSubmit(e) {
        e.preventDefault();
        let updatedOwner = {};
        this.props.attributes.forEach(attribute => {
            updatedOwner[attribute] = this.refs[attribute].input.value.trim();
        });
        this.props.onUpdate(this.props.owner, updatedOwner);
        this.handleClose();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />
        ];

        let inputs = this.props.attributes.map(attribute =>
            <div key={this.props.owner.entity[attribute]}>
                <TextField
                           defaultValue={this.props.owner.entity[attribute]}
                           floatingLabelText={attribute} ref={attribute} />
                <br />
            </div>
        );

        return (
            <div key={this.props.owner.entity._links.self.href}>
                <RaisedButton onClick={this.handleOpen.bind(this)} label="Update" />
                <Dialog
                    title="Update an owner"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {inputs}
                </Dialog>
            </div>
        )
    }

};