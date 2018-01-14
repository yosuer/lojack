import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class CreateDialog extends React.Component {

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
        let newOwner = {};
        this.props.attributes.forEach(attribute => {
            newOwner[attribute] = this.refs[attribute].input.value.trim();
        });
        this.props.onCreate(newOwner);
        this.props.attributes.forEach(attribute => {
            this.refs[attribute].input.value = '';
        });
        this.handleClose();
    }

    render() {
        let inputs = this.props.attributes.map(attribute =>
            <div key={attribute}>
                <TextField floatingLabelText={attribute} ref={attribute} />
                <br />
            </div>
        );
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Create"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />
        ];

        return (
            <div>
                <RaisedButton onClick={this.handleOpen.bind(this)} label="Create" />
                <Dialog
                    title="Create an owner"
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

}