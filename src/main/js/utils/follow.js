module.exports = function follow(client, rootPath, parameters) {

    let rel = parameters.rel;

    return client({
        method: 'GET',
        path: rootPath
    }).then(function (response) {
        if (hasEmbeddedRel(response.entity, rel)) {
            return response.entity._embedded[rel];
        }

        if(!response.entity._links) {
            return [];
        }

        return client({
            method: 'GET',
            path: response.entity._links[rel].href,
            params: parameters.params
        });

    });

    function hasEmbeddedRel (entity, rel) {
        return entity._embedded && entity._embedded.hasOwnProperty(rel);
    }
};