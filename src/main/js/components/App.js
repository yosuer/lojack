import React from 'react';
import OwnerList from './OwnerList';
import client from './../client';
import follow from './../follow';
import when from 'when';
import CreateDialog from './CreateDialog';
import stompClient from './../websocket-listener';

const root = '/api';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {owners: [], attributes: [], page: 1, pageSize: 2, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
                {rel: 'owners', params: {size: pageSize}}]
        ).then(ownerCollection => {
            return client({
                method: 'GET',
                path: ownerCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = ownerCollection.entity._links;
                return ownerCollection;
            })
        }).then(ownerCollection => {
            this.page = ownerCollection.entity.page;
            return ownerCollection.entity._embedded.owners.map(owner =>
                    client({
                        method: 'GET',
                        path: owner._links.self.href
                    })
            );
        }).then(ownerPromises => {
            return when.all(ownerPromises);
        }).done(owners => {
            this.setState({
                page: this.page,
                owners: owners,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        })
    }

    onCreate(newOwner) {
        follow(client, root, ['owners']).done(ownerCollection => {
            return client({
                method: 'POST',
                path: ownerCollection.entity._links.self.href,
                entity: newOwner,
                headers: {'Content-Type': 'application/json'}
            })
        });
    }

    onUpdate(owner, updatedOwner) {
        client({
            method: 'PUT',
            path: owner.entity._links.self.href,
            entity: updatedOwner,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': owner.headers.Etag
            }
        }).done(response => {
            /* Let the websocket handler update the state */
        }, response => {
            if (response.status.code === 412) {
                alert('DENIED: Unable to update ' + owner.entity._links.self.href + '. Your copy is stale.');
            }
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    onDelete(owner) {
        client({method: 'DELETE', path: owner.entity._links.self.href});
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(ownerCollection => {
            this.links = ownerCollection.entity._links;
            this.page = ownerCollection.entity.page;

            return ownerCollection.entity._embedded.owners.map(owner =>
                client({
                    method: 'GET',
                    path: owner._links.self.href
                })
            );
        }).then(ownerPromises => {
            return when.all(ownerPromises);
        }).done(owners => {
            this.setState({
                page: this.page,
                owners: owners,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    refreshAndGoToLastPage(message) {
        follow(client, root, [{
            rel: 'owners',
            params: {size: this.state.pageSize}
        }]).done(response => {
            if (response.entity._links.last !== undefined) {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        })
    }

    refreshCurrentPage(message) {
        follow(client, root, [{
            rel: 'owners',
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(ownerCollection => {
            this.links = ownerCollection.entity._links;
            this.page = ownerCollection.entity.page;

            return ownerCollection.entity._embedded.owners.map(owner => {
                return client({
                    method: 'GET',
                    path: owner._links.self.href
                })
            });
        }).then(ownerPromises => {
            return when.all(ownerPromises);
        }).then(owners => {
            this.setState({
                page: this.page,
                owners: owners,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        stompClient.register([
                {route: '/topic/newOwner', callback: this.refreshAndGoToLastPage},
                {route: '/topic/updateOwner', callback: this.refreshCurrentPage},
                {route: '/topic/deleteOwner', callback: this.refreshCurrentPage}
        ]);
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <OwnerList page={this.state.page}
                           owners = {this.state.owners}
                           links = {this.state.links}
                           pageSize = {this.state.pageSize}
                           attributes={this.state.attributes}
                           onNavigate = {this.onNavigate}
                           onDelete = {this.onDelete}
                           onUpdate = {this.onUpdate}
                           updatePageSize = {this.updatePageSize}/>
            </div>
        )
    }
}