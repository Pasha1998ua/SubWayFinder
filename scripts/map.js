var map;
var loc;

function loadMap(latIn,lngIn) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var startPos = {lat: position.coords.latitude, lng: position.coords.longitude};
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13, 
                center: startPos,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            });
            document.getElementById("lat").innerHTML = "Latitude : " + Math.round(position.coords.latitude * 1000) / 1000 + "";
            document.getElementById("lng").innerHTML = "Longitude : " + Math.round(position.coords.longitude * 1000) / 1000 + "";
            addMarker(startPos);
        });
    } else {
        var startPos = {lat: latIn, lng: lngIn};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13, 
            center: startPos,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });
        document.getElementById("lat").innerHTML = "Latitude : " + Math.round(latIn * 1000) / 1000 + "";
        document.getElementById("lng").innerHTML = "Longitude : " + Math.round(lngIn * 1000) / 1000 + "";
        addMarker(startPos);
    }
}

function centerMap(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadMap(position.coords.latitude,position.coords.longitude);
            document.getElementById("toShow").innerHTML = position.coords.latitude + " : " + position.coords.longitude;
        });
    } else {
        document.getElementById("toShow").innerHTML = "there is no navigator";
    }
}

function getNearest(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            fingNearestToLoc({lat: position.coords.latitude, lng: position.coords.longitude});
        });
    } else {
        document.getElementById("toShow").innerHTML = "there is no navigator";
    }
}

function setHTMLOnNearest(LocData){
    document.getElementById("name").innerHTML = "Name : " + LocData.name;
    document.getElementById("branch").innerHTML = "Branch : " + LocData.branch;
    document.getElementById("subInfo").style.opacity = 1;
    document.getElementById("detailInfo").style.opacity = 1;

    document.getElementById("firstL").innerHTML = LocData.firstL;
    document.getElementById("firstR").innerHTML = LocData.firstR;
    document.getElementById("lastL").innerHTML = LocData.lastL;
    document.getElementById("lastR").innerHTML = LocData.lastR;
    document.getElementById("description").innerHTML = LocData.description;
    document.getElementById("nearest").innerHTML = LocData.near;
}

function addMarker(position){
    var marker = new google.maps.Marker({position: position});
    marker.setMap(map);
}

function fingNearestToLoc(loc){
    var locationsArray = [];
    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'subway.json', false); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == 200) {
            locationsArray = JSON.parse(xobj.responseText);
            console.log("success");
          }
          else {
              console.log("error");
          }
    };
    xobj.send();  

    var minDist = 0;
    var LocMinDist;
    locationsArray.forEach(function(location, i, locationsArray) {
        var currenDist = getDistance(loc,locationsArray[i]);
        if(currenDist < minDist || minDist == 0){
            LocMinDist = locationsArray[i];
            minDist = currenDist;
        }
    });

    setHTMLOnNearest(LocMinDist);
    addMarker({lat: LocMinDist.lat, lng: LocMinDist.lng});
}

function rad(x) {
    return x * Math.PI / 180;
};  

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};
