/**
 * Returns a human readable address, from a pair of latitude and longitude coordinates
 * @param {latlng} latitude,longitude (comma separated) 
 * @return {results} a list of addresses found, in a json format 
 */
function geocodeLatLng(latlng) {
  var geocoder = new google.maps.Geocoder;

  var latlngStr = latlng.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        convertToJson(results);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function convertToJson (results) {
  return JSON.stringify(results);
}
