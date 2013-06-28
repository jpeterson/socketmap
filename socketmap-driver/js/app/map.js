define([
	'esri/map',
	'esri/dijit/Geocoder',
	'dojo/domReady!'
], function(Map, Geocoder) {

	// Create mapNode and messageNode
	var mapNode = document.createElement('div');
	var messageNode = document.createElement('div');
	var locatorNode = document.createElement('div');

	mapNode.setAttribute('id', 'map');

	messageNode.setAttribute('id', 'message');
	messageNode.className = 'message';
	messageNode.innerHTML = 'Loading...';

	locatorNode.setAttribute('id', 'locator');

	// Append nodes and insert into DOM
	mapNode.appendChild(messageNode);
	mapNode.appendChild(locatorNode);
	document.body.appendChild(mapNode);

	var map = new Map("map", {
		basemap: "topo",
		center: [-122.45, 37.75], //long, lat
		zoom: 13,
		sliderStyle: "small"
	});

	var locator = new Geocoder({
		map: map,
		autoComplete: true
	}, 'locator');
	locator.startup();

	return map;
});
