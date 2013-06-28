define([
    'app/map',
    'app/socket',
    'alertify',
    'esri/geometry/Extent',
    'dojo/topic',
    'dojo/domReady!'],

function(map, socket, alertify, Extent, topic) {
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

        var messageNode = document.getElementById('message');

        socket.on('timer', function(data) {
            messageNode.innerHTML = 'Last socket received @ ' + data.date;
        });

        mapSocket.on('map/setExtent', function(data) {
            alertify.success('Map has panned...', 1000);
            map.setExtent(new Extent(data.extent));
        });


    };

    return {
        initialize: initialize
    };
});