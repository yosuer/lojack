const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Owner extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.owner.fullName}</td>
                <td>{this.props.owner.phoneNumber}</td>
                <td>{this.props.owner.address}</td>
                <td>{this.props.owner.country}</td>
            </tr>
        )
    }
}

class OwnerList extends React.Component{
    render() {
        var owners = this.props.owners.map(owner =>
            <Owner key={owner._links.self.href} owner={owner}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>FullName</th>
                    <th>PhoneNumber</th>
                    <th>Address</th>
                    <th>Country</th>
                </tr>
                {owners}
                </tbody>
            </table>
        )
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {owners: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/owners'})
            .done(
                response => {
                    this.setState({owners: response.entity._embedded.owners});
    });
    }

    render() {
        return (
            <OwnerList owners={this.state.owners}/>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('react'));
