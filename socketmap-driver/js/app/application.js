define([
    'app/map',
    'app/socket',
    'alertify',
    'dojo/topic',
    'dojo/aspect',
    'dojo/domReady!'],

function(map, socket, alertify, topic, aspect) {
    var initialize = function() {

        /**************************************
         * 
         * Create vars for socket connections
         * 
         **************************************
        */

        var mapSocket  = socket.map,
            chatSocket = socket.chat,
            newsSocket = socket.news;

        /**************************************
         * 
         * Generic socket listeners
         * 
         **************************************
        */

        chatSocket.on('connect', function() {
            chatSocket.emit('hi!');
        });

        newsSocket.on('news', function() {
            newsSocket.emit('woot');
        });

        socket.on('greeting', function(greeting) {
            alertify.success('Welcome!', 5000);
        });

        var messageNode = document.getElementById('message');

        socket.on('timer', function(data) {
            messageNode.innerHTML = 'The time received is ' + data.date;
        });

        /**************************************
         * 
         * dojo/topic event listeners
         * 
         **************************************
        */

        // Subscribe to /socket/greeting topic
        // topic.subscribe('socket/greeting', function(data) {
        //     // Set innerHTML of messageNode to data.greeting
        //     var messageNode = document.getElementById('message');
        //     messageNode.innerHTML = data.greeting;
        // });


        /**************************************
         * 
         * dojo/aspect event listeners
         * 
         **************************************
        */

        // Emit when map extent changes
        aspect.after(map, 'onExtentChange', function(extent) {
            mapSocket.emit('map/onExtentChange', {
                extent: extent
            });
        }, true);

    };

    return {
        initialize: initialize
    };
});