import React from 'react';
import UpdateDialog from './UpdateDialog'

export default class Owner extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.owner);
    }

    render() {
        return (
            <tr>
                <td>{this.props.owner.entity.fullName}</td>
                <td>{this.props.owner.entity.phoneNumber}</td>
                <td>{this.props.owner.entity.address}</td>
                <td>{this.props.owner.entity.country}</td>
                <td>{this.props.owner.entity.manager.name}</td>
                <td>
                    <UpdateDialog owner={this.props.owner}
                                    attributes={this.props.attributes}
                                    onUpdate={this.props.onUpdate}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}