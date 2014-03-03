var map;
var stationarrs = [];
var linkdurations = [];
var startmarker;
var stopmarker;
var startgpsposition;
var myroutes = [];
var markers = [];
var polys = [];
var infowindow;
var startstation;
var touchoption = "none";
var endstation;
var maxstops = 2;
var allstations = [];
var mingroupedroute;
var mylocation = false;
var searchingdest = false;
var searchingstart = false;
var inputstart;
var inputdest;
var mapcentrelat = 38.916508;
var mapcentrelng = -77.028610;

var metrojson = '[{"line":"orange", "stations":' +
'[' +
'{"name":"Vienna/Fairfax","lat":38.877872,"lon":-77.271332,"dist":0,"change":false},' +
'{"name":"Dunn Loring","lat":38.883099,"lon":-77.228653,"dist":1,"change":false},' +
'{"name":"West Falls Church","lat":38.900684,"lon":-77.188866,"dist":1,"change":false},' +
'{"name":"East Falls Church","lat":38.885990,"lon":-77.156593,"dist":1,"change":false},' +
'{"name":"Ballston","lat":38.882248,"lon":-77.111618,"dist":1,"change":false},' +
'{"name":"Virginia Square","lat":38.883015,"lon":-77.103851,"dist":1,"change":false},' +
'{"name":"Clarendon","lat":38.886089,"lon":-77.096428,"dist":1,"change":false},' +
'{"name":"Courthouse","lat":38.891933,"lon":-77.083557,"dist":1,"change":false},' +
'{"name":"Rosslyn","lat":38.895473,"lon":-77.071922,"dist":1,"change":true},' +
'{"name":"Foggy Bottom-GWU","lat":38.900684,"lon":-77.050034,"dist":1,"change":false},' +
'{"name":"Farragut West","lat":38.901337,"lon":-77.039993,"dist":1,"change":false},' +
'{"name":"McPherson Square","lat":38.901356,"lon":-77.033279,"dist":1,"change":false},' +
'{"name":"Metro Center","lat":38.898315,"lon":-77.027786,"dist":1,"change":true},' +
'{"name":"Federal Triangle","lat":38.893806,"lon":-77.027870,"dist":1,"change":false},' +
'{"name":"Smithsonian","lat":38.887775,"lon":-77.028297,"dist":1,"change":false},' +
'{"name":"Enfant Plaza","lat":38.884888,"lon":-77.021591,"dist":1,"change":true},' +
'{"name":"Federal Center SW","lat":38.884937,"lon":-77.015488,"dist":1,"change":false},' +
'{"name":"Capitol South","lat":38.884937,"lon":-77.004738,"dist":1,"change":false},' +
'{"name":"Eastern Market","lat":38.884285,"lon":-76.994759,"dist":1,"change":false},' +
'{"name":"Potomac Avenue","lat":38.881046,"lon":-76.985146,"dist":1,"change":false},' +
'{"name":"Stadium-Armory","lat":38.885921,"lon":-76.977127,"dist":1,"change":true},' +
'{"name":"Minnesota Ave","lat":38.898182,"lon":-76.947685,"dist":1,"change":false},' +
'{"name":"Deanwood","lat":38.907867,"lon":-76.935455,"dist":1,"change":false},' +
'{"name":"Cheverly","lat":38.916550,"lon":-76.915115,"dist":1,"change":false},' +
'{"name":"Landover","lat":38.933975,"lon":-76.889961,"dist":1,"change":false},' +
'{"name":"New Carrollton","lat":38.948063,"lon":-76.871727,"dist":1,"change":false}' +
']},' +
'{"line":"blue", "stations":' +
'[' +
'{"name":"Franconia-Springfield","lat":38.766197,"lon":-77.168465,"dist":0,"change":false},' +
'{"name":"Van Dorn","lat":38.799282,"lon":-77.129066,"dist":1,"change":false},' +
'{"name":"King St.","lat":38.806438,"lon":-77.060806,"dist":1,"change":true},' +
'{"name":"Braddock Road","lat":38.813999,"lon":-77.053474,"dist":1,"change":false},' +
'{"name":"National Airport","lat":38.852978,"lon":-77.043510,"dist":1,"change":false},' +
'{"name":"Crystal City","lat":38.857788,"lon":-77.050339,"dist":1,"change":false},' +
'{"name":"Pentagon City","lat":38.862934,"lon":-77.059135,"dist":1,"change":false},' +
'{"name":"Pentagon","lat":38.869419,"lon":-77.053726,"dist":1,"change":true},' +
'{"name":"Arlington Cemetery","lat":38.884418,"lon":-77.062866,"dist":1,"change":false},' +
'{"name":"Rosslyn","lat":38.895473,"lon":-77.071922,"dist":1,"change":true},' +
'{"name":"Foggy Bottom-GWU","lat":38.900684,"lon":-77.050034,"dist":1,"change":false},' +
'{"name":"Farragut West","lat":38.901337,"lon":-77.039993,"dist":1,"change":false},' +
'{"name":"McPherson Square","lat":38.901356,"lon":-77.033279,"dist":1,"change":false},' +
'{"name":"Metro Center","lat":38.898315,"lon":-77.027786,"dist":1,"change":true},' +
'{"name":"Federal Triangle","lat":38.893806,"lon":-77.027870,"dist":1,"change":false},' +
'{"name":"Smithsonian","lat":38.887775,"lon":-77.028297,"dist":1,"change":false},' +
'{"name":"Enfant Plaza","lat":38.884888,"lon":-77.021591,"dist":1,"change":true},' +
'{"name":"Federal Center SW","lat":38.884937,"lon":-77.015488,"dist":1,"change":false},' +
'{"name":"Capitol South","lat":38.884937,"lon":-77.004738,"dist":1,"change":false},' +
'{"name":"Eastern Market","lat":38.884285,"lon":-76.994759,"dist":1,"change":false},' +
'{"name":"Potomac Avenue","lat":38.881046,"lon":-76.985146,"dist":1,"change":false},' +
'{"name":"Stadium-Armory","lat":38.885921,"lon":-76.977127,"dist":1,"change":true},' +
'{"name":"Benning Road","lat":38.890232,"lon":-76.937943,"dist":1,"change":false},' +
'{"name":"Capitol Heights","lat":38.889328,"lon":-76.913483,"dist":1,"change":false},' +
'{"name":"Addison Road","lat":38.886707,"lon":-76.893227,"dist":1,"change":false},' +
'{"name":"Largo Town Center","lat":38.900234,"lon":-76.844513,"dist":1,"change":false},' +
'{"name":"Morgan Boulevard","lat":38.893555,"lon":-76.868530,"dist":1,"change":false}' +
//'{"name":"Huntington","lat":38.793865,"lon":-77.074974,"dist":1,"change":false},' +
']},' +
'{"line":"yellow", "stations":' +
'[' +
'{"name":"Fort Totten","lat":38.951801,"lon":-77.001862,"dist":0,"change":true},' +
'{"name":"Georgia Ave-Petworth","lat":38.936096,"lon":-77.024330,"dist":1,"change":false},' +
'{"name":"Columbia Heights","lat":38.928699,"lon":-77.032486,"dist":1,"change":false},' +
'{"name":"U Street-Cardozo","lat":38.916508,"lon":-77.028610,"dist":1,"change":false},' +
'{"name":"Shaw-Howard University","lat":38.912926,"lon":-77.021866,"dist":1,"change":false},' +
'{"name":"Mount Vernon Square - 7th St - Convention Center","lat":38.905621,"lon":-77.021919,"dist":1,"change":false},' +
'{"name":"Gallery Place-Chinatown","lat":38.897495,"lon":-77.021652,"dist":1,"change":true},' +
'{"name":"Archives-Navy Memorial-Penn Quarter","lat":38.894073,"lon":-77.021797,"dist":1,"change":false},' +
'{"name":"Enfant Plaza","lat":38.884888,"lon":-77.021591,"dist":1,"change":true},' +
'{"name":"Pentagon","lat":38.869419,"lon":-77.053726,"dist":1,"change":true},' +
'{"name":"Pentagon City","lat":38.862934,"lon":-77.059135,"dist":1,"change":false},' +
'{"name":"Crystal City","lat":38.857788,"lon":-77.050339,"dist":1,"change":false},' +
'{"name":"National Airport","lat":38.852978,"lon":-77.043510,"dist":1,"change":false},' +
'{"name":"Braddock Road","lat":38.813999,"lon":-77.053474,"dist":1,"change":false},' +
'{"name":"King St.","lat":38.806438,"lon":-77.060806,"dist":1,"change":true},' +
'{"name":"Eisenhower Avenue","lat":38.800285,"lon":-77.070854,"dist":1,"change":false},' +
'{"name":"Huntington","lat":38.793865,"lon":-77.074974,"dist":1,"change":false}' +
']},' +
'{"line":"red", "stations":' +
'[' +
'{"name":"Glenmont","lat":39.061398,"lon":-77.053108,"dist":0,"change":false},' +
'{"name":"Wheaton","lat":39.038620,"lon":-77.050789,"dist":1,"change":false},' +
'{"name":"Forest Glen","lat":39.015484,"lon":-77.042702,"dist":1,"change":false},' +
'{"name":"Silver Spring","lat":38.989502,"lon":-77.026886,"dist":1,"change":false},' +
'{"name":"Takoma","lat":38.975407,"lon":-77.017441,"dist":1,"change":false},' +
'{"name":"Fort Totten","lat":38.951801,"lon":-77.001862,"dist":1,"change":true},' +
'{"name":"Brookland-CUA","lat":38.933292,"lon":-76.994484,"dist":1,"change":false},' +
'{"name":"Rhode Island Ave","lat":38.920788,"lon":-76.995621,"dist":1,"change":false},' +
'{"name":"New York Ave - Gallaudet Univ","lat":38.910004,"lon":-77.001289,"dist":1,"change":false},' +
'{"name":"Union Station","lat":38.897423,"lon":-77.007248,"dist":1,"change":false},' +
'{"name":"Judiciary Square","lat":38.896118,"lon":-77.016319,"dist":1,"change":false},' +
'{"name":"Gallery Place-Chinatown","lat":38.897495,"lon":-77.021652,"dist":1,"change":true},' +
'{"name":"Metro Center","lat":38.898315,"lon":-77.027786,"dist":1,"change":true},' +
'{"name":"Farragut North","lat":38.903435,"lon":-77.039490,"dist":1,"change":false},' +
'{"name":"Dupont Circle","lat":38.909626,"lon":-77.043335,"dist":1,"change":false},' +
'{"name":"Woodley Park-Zoo-Adams Morgan","lat":38.924980,"lon":-77.052368,"dist":1,"change":false},' +
'{"name":"Cleveland Park","lat":38.934734,"lon":-77.057945,"dist":1,"change":false},' +
'{"name":"Van Ness-UDC","lat":38.943638,"lon":-77.063194,"dist":1,"change":false},' +
'{"name":"Tenleytown-American Univ","lat":38.947895,"lon":-77.079224,"dist":1,"change":false},' +
'{"name":"Friendship Heights","lat":38.960011,"lon":-77.085251,"dist":1,"change":false},' +
'{"name":"Bethesda","lat":38.984398,"lon":-77.094109,"dist":1,"change":false},' +
'{"name":"Medical Center","lat":39.000057,"lon":-77.096901,"dist":1,"change":false},' +
'{"name":"Grosvenor-Strathmore","lat":39.029221,"lon":-77.103813,"dist":1,"change":false},' +
'{"name":"White Flint","lat":39.048176,"lon":-77.112831,"dist":1,"change":false},' +
'{"name":"Twinbrook","lat":39.062389,"lon":-77.120804,"dist":1,"change":false},' +
'{"name":"Rockville","lat":39.084438,"lon":-77.145836,"dist":1,"change":false},' +
'{"name":"Shady Grove","lat":39.119972,"lon":-77.164795,"dist":1,"change":false,"change":false}' +
']},' +
'{"line":"green", "stations":' +
'[' +
'{"name":"Branch Avenue","lat":38.827023,"lon":-76.911827,"dist":0,"change":false},' +
'{"name":"Suitland","lat":38.843819,"lon":-76.931633,"dist":1,"change":false},' +
'{"name":"Naylor Road","lat":38.851257,"lon":-76.956306,"dist":1,"change":false},' +
'{"name":"Southern Ave","lat":38.841011,"lon":-76.975021,"dist":1,"change":false},' +
'{"name":"Congress Heights","lat":38.845356,"lon":-76.987900,"dist":1,"change":false},' +
'{"name":"Anacostia","lat":38.861782,"lon":-76.995361,"dist":1,"change":false},' +
'{"name":"Navy Yard","lat":38.876484,"lon":-77.004723,"dist":1,"change":false},' +
'{"name":"Waterfront-SEU","lat":38.876518,"lon":-77.017204,"dist":1,"change":false},' +
'{"name":"Enfant Plaza","lat":38.884888,"lon":-77.021591,"dist":1,"change":true},' +
'{"name":"Archives-Navy Memorial-Penn Quarter","lat":38.894073,"lon":-77.021797,"dist":1,"change":false},' +
'{"name":"Gallery Place-Chinatown","lat":38.897495,"lon":-77.021652,"dist":1,"change":true},' +
'{"name":"Mount Vernon Square - 7th St - Convention Center","lat":38.905621,"lon":-77.021919,"dist":1,"change":false},' +
'{"name":"Shaw-Howard University","lat":38.912926,"lon":-77.021866,"dist":1,"change":false},' +
'{"name":"U Street-Cardozo","lat":38.916508,"lon":-77.028610,"dist":1,"change":false},' +
'{"name":"Columbia Heights","lat":38.928699,"lon":-77.032486,"dist":1,"change":false},' +
'{"name":"Georgia Ave-Petworth","lat":38.936096,"lon":-77.024330,"dist":1,"change":false},' +
'{"name":"Fort Totten","lat":38.951801,"lon":-77.001862,"dist":1,"change":true},' +
'{"name":"West Hyattsville","lat":38.955021,"lon":-76.969528,"dist":1,"change":false},' +
'{"name":"Prince George&#39;s Plaza","lat":38.965214,"lon":-76.956009,"dist":1,"change":false},' +
'{"name":"College Park-U of Md","lat":38.978378,"lon":-76.927811,"dist":1,"change":false},' +
'{"name":"Greenbelt","lat":39.010998,"lon":-76.911270,"dist":1,"change":false}' +
']}]';

function station(stationid, name, line, lat, lon, change) {
	this.stationid = stationid;
	this.name = name;
	this.line = line;
	this.lat = lat;
	this.lon = lon;
	this.change = change;
}

//route constructor
function route(name, stations) {
	//durations.length = stations.length because durations = duration of corresponding station from last station
	this.name = name;
	this.stations = stations;
	this.duration = getStationsArrayDistance(stations);
}

//route constructor
function groupedroute(routes, firststation, laststation) {
	//durations.length = stations.length because durations = duration of corresponding station from last station
	this.routes = routes;
	var dur = 0;
	var st = -1;
	$.each(routes, function() {
		dur += this.duration;
		st++;
	});
	this.stops = st;
	this.duration = dur;
	this.firststation = firststation;
	this.laststation = laststation;
}

function link(fromstation, tostation, duration) {
	this.fromstation = fromstation;
	this.tostation = tostation;
	this.duration = duration;
	this.distance = getDistanceFromLatLonInKm(tostation.lat, tostation.lon, fromstation.lat, fromstation.lon);
}

function loadMain() {

	$.mobile.changePage("#mainPage");
	google.maps.event.trigger(map, 'resize');
	zoom(mingroupedroute);
}

function initialize() {

	var mapOptions = {
		zoom : 11,
		center : new google.maps.LatLng(mapcentrelat, mapcentrelng)
	};

	google.maps.visualRefresh = true;
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.trigger(map, 'resize');
	infowindow = new google.maps.InfoWindow({
		content : "contentString"
	});
	google.maps.event.trigger(map, 'resize');

	//getLocation();

	var imagestart = 'images/start.png';
	var imagestop = 'images/stop.png';

	startstation = allstations[0];

	endstation = allstations[allstations.length - 1];
	startmarker = new google.maps.Marker({
		map : map,
		draggable : true,
		position : new google.maps.LatLng(startstation.lat, startstation.lon),
		icon : imagestart
	});
	stopmarker = new google.maps.Marker({
		map : map,
		draggable : true,
		position : new google.maps.LatLng(endstation.lat, endstation.lon),
		icon : imagestop
	});

	google.maps.event.addListener(startmarker, 'dragend', function(event) {
		startstation = closeststation(event.latLng);
		if (endstation.stationid != "none")
			drawShortestRoute(startstation, endstation);

	});

	google.maps.event.addListener(stopmarker, 'dragend', function(event) {
		endstation = closeststation(event.latLng);
		if (startstation.stationid != "none") {
			drawShortestRoute(startstation, endstation);
		}
	});

	google.maps.event.addListener(map, 'click', function(event) {
		if (touchoption == "start") {
			startmarker.setPosition(event.latLng);
			startstation = closeststation(event.latLng);
			if (endstation.stationid != "none")
				drawShortestRoute(startstation, endstation);
		} else if (touchoption == "destination") {
			stopmarker.setPosition(event.latLng);
			endstation = closeststation(event.latLng);
			if (startstation.stationid != "none")
				drawShortestRoute(startstation, endstation);
		}

	});

	drawrfixedroutes(myroutes);
	//zoom(allstations);
	searchBox();
	$("#select-choice-start").val("search-start");
	google.maps.event.trigger(map, 'resize');

	$("#mainPage").on('pageshow', function() {
		google.maps.event.trigger(map, 'resize');
		drawShortestRoute(startstation, endstation);
	});

	$('input[name=start-radio]').on('change', function() {

		if (this.value == "choice-1") {
			$("#startstationsdiv").show();
			$("#startsearchdiv").hide();
			if (searchingdest) {
				map.controls[google.maps.ControlPosition.TOP].pop(inputdest);
				searchingdest = false;
			}
			if (searchingstart) {
				map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
				searchingstart = false;
			}
		} else if (this.value == "choice-2") {
			$("#startstationsdiv").hide();
			$("#startsearchdiv").show();

			$("#startPage").popup("close");
			if (searchingdest) {
				searchingdest = false;
				map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
			}
			if (!searchingstart) {
				map.controls[google.maps.ControlPosition.TOP].push(inputstart);
				searchingstart = true;
			}
		} else if (this.value == "choice-3") {
			$("#startstationsdiv").hide();
			$("#startsearchdiv").hide();
			$("#startPage").popup("close");
			if (searchingdest) {
				searchingdest = false;
				map.controls[google.maps.ControlPosition.TOP].pop(inputdest);
			}
			if (searchingstart) {
				map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
				searchingstart = false;
			}
			getLocation();

		}
	});

	$('input[name=destination-radio]').on('change', function() {

		if (this.value == "choice-1") {
			$("#destinationstationsdiv").show();
			$("#destinationsearchdiv").hide();
			if (searchingdest) {
				map.controls[google.maps.ControlPosition.TOP].pop(inputdest);
				searchingdest = false;
			}
			if (searchingstart) {
				$("#destinationstationsdiv").hide();
				map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
				searchingstart = false;
			}
		} else if (this.value == "choice-2") {
			$("#destinationstationsdiv").hide();
			$("#destinationsearchdiv").show();
			$("#destPage").popup("close");
			if (searchingstart) {
				map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
				searchingstart = false;
			}
			if (!searchingdest) {
				map.controls[google.maps.ControlPosition.TOP].push(inputdest);
				searchingdest = true;
			}
		}
	});

	$("#detailsbutton").click(function() {
		$.mobile.activePage.find('#popupPanel').panel("open");
	});
	$("#setstartbutton").click(function() {
		goToMap();
		var selected = $("input[name=start-radio]:checked");
		if (selected.length > 0) {
			selectedVal = selected.val();
		}
		if (selectedVal == "choice-2") {
			map.controls[google.maps.ControlPosition.TOP].push(inputstart);
			$("#startsearchdiv").show();
		}
	});
	$("#setdestbutton").click(function() {
		goToMap();
		var selected = $("input[name=destination-radio]:checked");
		if (selected.length > 0) {
			selectedVal = selected.val();
		}
		if (selectedVal == "choice-2") {
			map.controls[google.maps.ControlPosition.TOP].push(inputdest);
			$("#destinationsearchdiv").show();
		}
	});
}

function searchBox() {
	// Create the search box and link it to the UI element.
	inputstart = (document.getElementById('pac-input-start'));
	inputdest = (document.getElementById('pac-input-dest'));
	var startbutton = (document.getElementById('startbutton'));
	var destbutton = (document.getElementById('destbutton'));
	var detailsbutton = (document.getElementById('detailsbutton'));

	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(startbutton);
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(destbutton);
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(detailsbutton);

	var searchBoxStart = new google.maps.places.SearchBox((inputstart));
	var searchBoxDest = new google.maps.places.SearchBox((inputdest));
	google.maps.event.addListener(searchBoxStart, 'places_changed', function() {
		map.controls[google.maps.ControlPosition.TOP].pop(inputstart);
		searching = false;
		$("#startsearchdiv").hide();
		var places = searchBoxStart.getPlaces();
		startmarker.setPosition(places[0].geometry.location);
		startstation = closeststation(places[0].geometry.location);
		if (endstation.stationid != "none")
			drawShortestRoute(startstation, endstation);

	});

	google.maps.event.addListener(searchBoxDest, 'places_changed', function() {
		map.controls[google.maps.ControlPosition.TOP].pop(inputdest);
		$("#destsearchdiv").hide();
		var places = searchBoxDest.getPlaces();
		stopmarker.setPosition(places[0].geometry.location);
		endstation = closeststation(places[0].geometry.location);
		if (startstation.stationid != "none")
			drawShortestRoute(startstation, endstation);
	});

	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBoxStart.setBounds(bounds);
	});

	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBoxDest.setBounds(bounds);
	});
}

function goToMap() {
	if (mylocation) {
		getLocation();
	}
	$(".ui-popup").popup("close");
	//drawShortestRoute(startstation, endstation);

}

function setStartStation(stationid) {
	startstation = getStationByID(stationid);
	startmarker.setPosition(new google.maps.LatLng(startstation.lat, startstation.lon));
	if (endstation.stationid != "none")
		drawShortestRoute(startstation, endstation);
	$('input[data-type="search"]').val("");
	$('input[data-type="search"]').trigger("keyup");

	$(".ui-popup").popup("close");
	//$("#startstationlabel").text(startstation.name);

}

function setEndStation(stationid) {
	endstation = getStationByID(stationid);
	stopmarker.setPosition(new google.maps.LatLng(endstation.lat, endstation.lon));

	if (startstation.stationid != "none")
		drawShortestRoute(startstation, endstation);
	$('input[data-type="search"]').val("");
	$('input[data-type="search"]').trigger("keyup");
	$(".ui-popup").popup("close");
	//$("#deststationlabel").text(endstation.name);
}

function getStationByID(stationid) {
	var outstation;
	$.each(allstations, function() {
		if (stationid == this.stationid)
			outstation = this;
	});
	return outstation;
}

function populateListViews() {

	var output = '';
	$.each(allstations, function() {
		$('#stations-start').append("<li onclick='setStartStation(" + this.stationid + ")'  class='ui-screen-hidden' ><a>" + this.name + "</a></li>");
		$('#stations-dest').append("<li onclick='setEndStation(" + this.stationid + ")' class='ui-screen-hidden' ><a>" + this.name + "</a></li>");
	});
	$('#stations-start').listview('refresh');
	$('#stations-dest').listview('refresh');
}

function clearOverlays() {//clear overlays function
	if (markers) {
		for (i in markers) {
			markers[i].setMap(null);
		}
		for (i in polys) {
			polys[i].setMap(null);
		}
	}
}

function zoom(fitstations) {
	var bounds = new google.maps.LatLngBounds();
	$.each(fitstations, function() {
		bounds.extend(new google.maps.LatLng(this.lat, this.lon));
	});
	bounds.extend(startmarker.getPosition());
	bounds.extend(stopmarker.getPosition());
	map.fitBounds(bounds);
	//map.setZoom(map.getZoom() );
}

function drawShortestRoute(ss, es) {
	$("#detailsbutton").show();
	clearOverlays(); mingroupedroute;
	$('#route-list').empty();
	var mintime = -1;
	var time = 0;
	for (var i = 0; i < getRoutesWithStops(ss, es, 4).length; i++) {
		var currgroupedroute = getRoutesWithStops(ss, es, 4)[i];

		if ((currgroupedroute.duration < mintime) || mintime < 0) {
			mintime = currgroupedroute.duration;
			mingroupedroute = currgroupedroute;
			/////here we must consider whether to take shortest path or least number of stations
		}
	};
	var zoomstations = [];
	$('#route-list').append("<li data-theme='c'></li>").listview('refresh');
	$.each(mingroupedroute.routes, function() {
		drawroute(this);
		$.each(this.stations, function() {
			zoomstations.push(this);
		});
	});
	$('#route-list').append("<li data-theme='c'></li>").listview('refresh');
	$('#route-list').append("<li data-theme='c'></li>").listview('refresh');
	$('#route-list').append("<li data-theme='b' style='text-align: center;'>Number of interchanges: " + (mingroupedroute.routes.length - 1) + "</li>").listview('refresh');

	zoom(zoomstations);
}

function drawroute(route) {

	var polyOptions = {
		strokeColor : "#FFFFFF",
		strokeOpacity : 1,
		strokeWeight : 4,
	};

	var poly = new google.maps.Polyline(polyOptions);
	poly.setMap(map);
	polys.push(poly);
	var path = poly.getPath();

	var curr = 0;
	$.each(route.stations, function() {
		path.push(new google.maps.LatLng(this.lat, this.lon));

		if (this == startstation || curr == 0 || this == endstation) {

			var stats = route.stations.length - 2;
			if (stats == -1)
				stats = 0;
			var iconimage = 'images/metro.png';
			var startdist = getDistanceFromLatLonInKm(startmarker.position.lat(), startmarker.position.lng(), startstation.lat, startstation.lon);
			var destdist = getDistanceFromLatLonInKm(stopmarker.position.lat(), stopmarker.position.lng(), endstation.lat, endstation.lon);
			var startdist = Math.round(startdist * 1000);
			var destdist = Math.round(destdist * 1000);
			var startdiststr = "";
			var destdiststr = "";
			if (startdist > 0.1 && startdist < 1000)
				startdiststr = " (" + startdist + "m from Starting Point)";
			else if (startdist >= 1000)
				startdiststr = " (" + Math.round(startdist / 100) / 10 + "Km from Starting Point)";
			if (destdist > 0.1 && destdist < 1000)
				destdiststr = " (" + destdist + "m from Destination)";
			else if (destdist >= 1000)
				destdiststr = " (" + Math.round(destdist / 100) / 10 + "Km from Destination)";

			if (this == startstation) {
				iconimage = 'images/metrostart.png';
				//$('#route-list').append("<li data-theme='b' style='text-align: center;'>Start</li>").listview('refresh');
				$('#route-list').append("<li data-theme='a'style='text-align: center;'>Start from: " + this.name + startdiststr + "</li>").listview('refresh');
				$('#route-list').append("<li data-theme='d' style='text-align: center;'>(Pass " + stats + " stations)</li>").listview('refresh');
			} else if (this == endstation) {
				iconimage = 'images/metrodest.png';
				$('#route-list').append("<li data-theme='a' style='text-align: center;'>Stop at: " + this.name + destdiststr + "</li>").listview('refresh');
				//$('#route-list').append("<li data-theme='b'style='text-align: center;'>Destination</li>").listview('refresh');
			} else if (curr == 0 && this != endstation && this != startstation) {
				iconimage = 'images/metro.png';
				$('#route-list').append("<li data-theme='a' style='text-align: center;'>Change at: " + this.name + "</li>").listview('refresh');
				$('#route-list').append("<li data-theme='d' style='text-align: center;' >(Pass " + stats + " stations)</li>").listview('refresh');
			}
			if (startstation == endstation) {
				iconimage = 'images/metrodest.png';
				$('#route-list').append("<li data-theme='a' style='text-align: center;'>" + this.name + "</li>").listview('refresh');
				$('#route-list').append("<li data-theme='b'style='text-align: center;'>Destination</li>").listview('refresh');

			}
			var marker = new google.maps.Marker({
				position : new google.maps.LatLng(this.lat, this.lon),
				title : this.name,
				map : map,
				icon : iconimage
			});
			markers.push(marker);
			// Listen for click event
			google.maps.event.addListener(marker, 'click', function() {
				onItemClick(event, marker);
			});

		}

		var marker = new google.maps.Marker({
			position : new google.maps.LatLng(this.lat, this.lon),
			title : this.name,
			icon : {
				path : google.maps.SymbolPath.CIRCLE,
				scale : 4,
				strokeColor : "#000000"
			},
			map : map
		});
		markers.push(marker);

		// Listen for click event
		google.maps.event.addListener(marker, 'click', function() {
			onItemClick(event, marker);
		});
		curr++;
	});
}

function onItemClick(event, pin) {
	// Create content
	var contentString = pin.title;
	// Replace our Info Window's content and position
	infowindow.setContent(contentString);
	infowindow.setPosition(pin.position);
	infowindow.open(map);
}

function closeststation(latlong) {
	var closest = -1;

	var clstation;
	$.each(allstations, function() {
		var distance = getDistanceFromLatLonInKm(latlong.lat(), latlong.lng(), this.lat, this.lon);
		if (closest == -1 || distance < closest) {
			clstation = this;
			closest = distance;
		}
	});

	return clstation;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371;
	// Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);
	// deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	// Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

//returns array of array of stations on path from start to stop stations
function getDirectRoutes(fromstation, tostation) {
	
	var possiblestartstats = [];
	if (fromstation.change)
	{
		get all stations that are on diff routes???
	}
	var directroutes = [];
		if (($.inArray(fromstation.line, tostation.line) > -1)) {
			var directroute = new route("Direct Route", getStationsBetweenRoute(fromstation, tostation, getRouteByName(this)));
			directroutes.push(directroute);
		}
	return directroutes;
}

//returns array of groupedroutes
function getRoutesWithStops(fromstation, tostation, maxstops) {
	var iteration = 0;
	var possibleroutes = [];
	var possiblefullroutes = [];
	var possibleroute = [];
	var reached = false;
	if (hasDirectRoute(fromstation, tostation)) {
		$.each(getDirectRoutes(fromstation, tostation), function() {
			var groupedrouteout = new groupedroute(new Array(this), fromstation, tostation);
			possibleroutes.push(groupedrouteout);
			possiblefullroutes.push(groupedrouteout);
		});
		reached = true;
	} else {

		$.each(getChangeStations(fromstation), function() {
			var firststop = this;
			$.each(getDirectRoutes(fromstation, this), function() {
				//pass rute not array first
				var groupedrouteout = new groupedroute(new Array(this), fromstation, firststop);
				possibleroutes.push(groupedrouteout);
			});
		});
	}
	while ((!reached)) {
		$.each(possibleroutes, function() {
			var thisroute = this;
			if (hasDirectRoute(thisroute.laststation, tostation)) {
				$.each(getDirectRoutes(this.laststation, tostation), function() {
					thisroute.routes.push(this);
					thisroute.laststation = tostation;
					thisroute.duration += this.duration;
					possiblefullroutes.push(thisroute);
				});
				reached = true;
				//should be ok till here....look down
			} else {
				$.each(getChangeStations(thisroute.laststation), function() {
					var chst = this;
					$.each(getDirectRoutes(thisroute.laststation, chst), function() {
						var groupedrouteout = thisroute;
						groupedrouteout.routes.push(this);
						groupedrouteout.laststation = chst;
						groupedrouteout.duration += this.duration;
						possibleroutes.push(groupedrouteout);
					});
				});

			}
		});
		iteration++;
	}

	return possiblefullroutes;
}

function getStationsArrayDistance(stations) {
	var duration = 0;
	if (stations.length > 1) {
		for (var i = 0; i < (stations.length ); i++) {
			duration += getLinkDuration(stations[i], stations[i + 1]);
		}
	}
	return duration;
}

function getLinkDuration(fromstation, tostation) {
	var duration = 0;
	$.each(linkdurations, function() {
		if (((this.fromstation == fromstation) && (this.tostation == tostation)) || ((this.tostation == fromstation) && (this.fromstation == tostation))) {
			duration = this.duration;
		}
	});
	return duration;
}

function hasDirectRoute(fromstation, tostation) {
	return (getDirectRoutes(fromstation, tostation).length > 0);
}

function getRouteByName(name) {
	var resroute;
	$.each(myroutes, function() {
		if (this.name == name) {
			resroute = this;
		}
	});
	return resroute;
}


//returns change stations on same rout as from station
function getChangeStations(fromstation) {
	var changestations = [];
	var currroute;
	$.each(myroutes, function() {
		if ($.inArray(this.name, fromstation.routes) > -1) {
			currroute = this;
			$.each(currroute.stations, function() {
				if (this.routes.length > 1) {
					changestations.push(this);
					//alert(this.name);
				}
			});
		}
	});
	return changestations;
}

function getStationsBetweenRoute(fromstation, tostation, route) {
	var resstations = [];
	var hit = false;
	for (var i = $.inArray(fromstation, route.stations); i <= route.stations.length; i++) {
		resstations.push(route.stations[i]);
		if (route.stations[i] == tostation) {
			hit = true;
			break;
		}
	}
	if (!hit) {
		resstations = [];
		for (var i = $.inArray(fromstation, route.stations); i >= 0; i--) {
			resstations.push(route.stations[i]);
			if (route.stations[i] == tostation) {
				hit = true;
				break;
			}
		}
	}
	return resstations;
}

$(function() {
	$("#mylocation").click(function() {
		$.mobile.navigate("#mainPage");
	});
});

function getLocation() {
	if (navigator.geolocation) {
		var options = {
			frequency : 3600000
		};
		navigator.geolocation.getCurrentPosition(showPosition, onError, null);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
	mylocation = false;
}

function showPosition(position) {
	startgpsposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	startmarker.setPosition(startgpsposition);
	startstation = closeststation(startgpsposition);
	if (endstation.stationid != "none")
		drawShortestRoute(startstation, endstation);
	mylocation = false;
}

function onError(error) {
	//alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


$(document).ready(function() {
	var json = $.parseJSON(metrojson);

	$.each(json, function(index, value) {
		var stationarr = [];
		var line = value.line;
		$.each(value.stations, function() {
			var stat = new station(line + this.name, this.name, line, this.lat, this.lon, this.change);
			stationarr.push(stat);
			allstations.push(stat);
			if (stationarr.length > 1) {
				linkdurations.push(new link(stationarr[stationarr.length - 2], stationarr[stationarr.length - 1], this.dist));
			}
		});
		stationarrs.push(stationarr);
		var newroute = new route(line, stationarr);
		myroutes.push(newroute);
	});
	populateListViews();
});


function drawrfixedroutes(routes) {

	$.each(routes, function() {
		var colour = "";
		if (this.name == "red") {
			colour = "#FF0000";
		} else if (this.name == "green") {
			colour = "#00FF00";
		} else if (this.name == "blue") {
			colour = "#0000FF";
		} else if (this.name == "orange") {
			colour = "#FF4500";
		} else if (this.name == "yellow") {
			colour = "#FFFF00";
		}
		var polyOptions = {
			strokeColor : colour,
			strokeOpacity : 0.5,
			strokeWeight : 12
		};
		var poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		var path = poly.getPath();

		$.each(this.stations, function() {
			path.push(new google.maps.LatLng(this.lat, this.lon));

		});
	});
}

function loadScript() {
	if (window.navigator.onLine) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&v=3.exp&' + 'callback=initialize';
		document.body.appendChild(script);

	} else
		alert("offline");
}

window.onload = loadScript;
