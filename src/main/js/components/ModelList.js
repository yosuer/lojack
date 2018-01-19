import React from 'react';
import {Table} from 'reactstrap';
import ModelItem from "./ModelItem";
import YPagination from "./YPagination";

export default class ModelList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.props.fields.map(field =>
                                <th key={field}>
                                    {this.props.attributes[field] ? this.props.attributes[field].description : null}
                                </th>)}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(item =>
                            <ModelItem key={item.url} item={item} fields={this.props.fields}
                                       attributes={this.props.attributes} onUpdate={this.props.onUpdate}
                                       onDelete={this.props.onDelete}/>)}
                    </tbody>
                </Table>
                <YPagination links={this.props.links} page={this.props.page}
                             onNavigate={this.props.onNavigate} updatePageSize={this.props.updatePageSize}/>
            </div>

        )
    }
}