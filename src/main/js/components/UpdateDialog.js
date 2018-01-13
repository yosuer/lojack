import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let updatedOwner = {};
        this.props.attributes.forEach(attribute => {
            updatedOwner[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onUpdate(this.props.owner, updatedOwner);
        window.location = "#";
    }

    render() {
        let inputs = this.props.attributes.map(attribute =>
            <p key={this.props.owner.entity[attribute]}>
                <input type="text" placeholder={attribute}
                       defaultValue={this.props.owner.entity[attribute]}
                       ref={attribute} className="field" />
            </p>
        );

        let dialogId = "updateOwner-" + this.props.owner.entity._links.self.href;

        return (
            <div key={this.props.owner.entity._links.self.href}>
                <a href={"#" + dialogId}>Update</a>
                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>
                        <h2>Update an owner</h2>
                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

};