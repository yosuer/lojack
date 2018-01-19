import React from 'react';
import UpdateDialog from './UpdateDialog';
import {Button, Row} from 'reactstrap';

export default class ModelItem extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.item);
    }

    render(){
        return (
            <tr>
                <th scope="row">{this.props.item.entity._links.self.href.split("/").pop()}</th>
                {this.props.fields.map(field =>
                        <td key={field}>{this.props.item.entity[field]}</td>
                )}
                <td>
                    <Row>
                        <UpdateDialog item={this.props.item}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate}>
                        </UpdateDialog>{' '}
                        <Button color="danger" onClick={this.handleDelete}>Delete</Button>
                    </Row>
                </td>
            </tr>
        )
    }
}