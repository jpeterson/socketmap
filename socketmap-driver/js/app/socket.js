define([
	'socketio',
	'dojo/topic',
	'dojo/domReady!'],

function(io, topic) {
	var socket = io.connect('http://tdtmacbook:8081');
	socket.map = io.connect('http://tdtmacbook:8081/map');
	socket.chat = io.connect('http://tdtmacbook:8081/chat');
	socket.news = io.connect('http://tdtmacbook:8081/news');
	return socket;
});