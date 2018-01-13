'use strict';

import SockJS from 'sockjs-client';

require('stompjs'); // <2>

function register(registrations) {
    let socket = SockJS('/payroll'); // <3>
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) { // <4>
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register