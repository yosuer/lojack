import React from 'react';
import ModelList from './ModelList';
import client from '../utils/client';
import follow from '../utils/follow';
import when from 'when';
import stompClient from '../utils/websocket-listener';
import {Container} from 'reactstrap';

const root = '/api';

export default class ModelAbm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], attributes: [], page: 1, pageSize: 5, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.loadCollection = this.loadCollection.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: this.props.model, params: {size: pageSize}}]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                /**
                 * Filter unneeded JSON Schema properties, like uri references and
                 * subtypes ($ref).
                 */
                let props = schema.entity.properties;
                Object.keys(props).forEach(function (prop) {
                    if (props[prop].hasOwnProperty('format') && props[prop].format === 'uri') {
                        delete props[prop];
                    } else if (props[prop].hasOwnProperty('$ref')) {
                        delete props[prop];
                    }
                });
                this.schema = schema.entity;
                return itemCollection;
            })
        }).then(collection => this.loadCollection(collection, pageSize))
    }

    onCreate(newItem) {
        follow(client, root, [this.props.model]).done(itemCollection => {
            return client({
                method: 'POST',
                path: itemCollection.entity._links.self.href,
                entity: newItem,
                headers: {'Content-Type': 'application/json'}
            })
        });
    }

    onUpdate(item, updatedItem) {
        client({
            method: 'PATCH',
            path: item.entity._links.self.href,
            entity: updatedItem,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': item.headers.Etag
            }
        }).done(response => {
            /* Let the websocket handler update the state */
        }, response => {
            if (response.status.code === 412) {
                alert('DENIED: Unable to update ' + item.entity._links.self.href + '. Your copy is stale.');
            }
            if (response.status.code === 403) {
                alert('DENIED: Unable to update ' + item.entity._links.self.href + '. Do you havent permision');
            }
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    onDelete(item) {
        client({method: 'DELETE', path: item.entity._links.self.href});
    }

    loadCollection(entityCollection, pageSize) {
        this.links = entityCollection.entity._links;
        this.page = entityCollection.entity.page;

        let promises = entityCollection.entity._embedded[this.props.model].map(item =>
            client({
                method: 'GET',
                path: item._links.self.href
            })
        );

        when.all(promises)
            .done(results => {
                this.setState({
                    page: this.page,
                    items: results,
                    attributes: Object.keys(this.schema.properties),
                    links: this.links,
                    pageSize: pageSize || this.state.pageSize
                })
            });
    }

    refreshCurrentPage(message) {
        follow(client, root, [{
            rel: this.props.model,
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(this.loadCollection);
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(this.loadCollection);
    }

    refreshAndGoToLastPage(message) {
        follow(client, root, [{
            rel: this.props.model,
            params: {size: this.state.pageSize}
        }]).done(response => {
            if (response.entity._links.last !== undefined) {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        })
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        stompClient.register([
                {route: '/topic/' + this.props.model + '/new', callback: this.refreshAndGoToLastPage},
                {route: '/topic/' + this.props.model + '/update', callback: this.refreshCurrentPage},
                {route: '/topic/' + this.props.model + '/delete', callback: this.refreshCurrentPage}
        ]);
    }

    render() {
        return (
            <Container>
                <h1>Entity</h1>
                <ModelList page={this.state.page}
                           items = {this.state.items}
                           links = {this.state.links}
                           pageSize = {this.state.pageSize}
                           attributes={this.state.attributes}
                           onNavigate = {this.onNavigate}
                           onDelete = {this.onDelete}
                           onUpdate = {this.onUpdate}
                           onCreate = {this.onCreate}
                           updatePageSize = {this.updatePageSize}/>
            </Container>
        )
    }
}