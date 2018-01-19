import React from 'react';
import ModelAbm from "./ModelAbm";

export default class Manager extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentAbm: {
                abm: 'employees',
                fields: ['document', 'code', 'firstName', 'address']
            }}
    }

    render() {
        return (
            <ModelAbm model={this.state.currentAbm.abm} fields={this.state.currentAbm.fields}/>
        )
    }
}