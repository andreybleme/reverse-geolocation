# reverse-geolocation
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)
Get a human readable address from geo coordinates :earth_americas:

It converts geographic coordinates into a readable address. It also gives you a usefull JSON with address information according to a geocode coordinate.

## Why?

Using APIs and services that provide geo-referenced information, what we receive in response use to be something like: `40.714224,-73.961452`, 
geographic coordinates (latitude and longitude). Having these coordinates in hand, we always have to find a way to transform it into
a readable and usable format.

### Dependencies
It clearly uses the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/?hl=pt-BR), so remeber to get your own API Key at https://developers.google.com/maps/documentation/javascript/get-api-key.

Having it done, activate the Google Maps JavaScript API:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&signed_in=true&callback=initMap" async defer></script>
```

## How it works

To easily get usefull information about a place that corresponds to a geocode, having the geographic coordinates yout just need to use
the `reversegeocode.js`'s function: `geocodeLatLng()`:

```javascript
function geocodeLatLng(latlng) {
  var geocoder = new google.maps.Geocoder;

  var latlngStr = latlng.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        convertToJson(results[0]);
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
```

The `latlng` parameter, must me a pair of geo coordinates separated by comma, like `40.714224,-73.961452`.

The `results` object, contain the addresses found corresponding to the geocode. It use to contain more than just one address. 
The full list of addresses returned by the previous query is shown below.
```javascript
results[0].formatted_address: "275-291 Bedford Ave, Brooklyn, NY 11211, USA",
results[1].formatted_address: "Williamsburg, NY, USA",
results[2].formatted_address: "New York 11211, USA",
results[3].formatted_address: "Kings, New York, USA",
results[4].formatted_address: "Brooklyn, New York, USA",
results[5].formatted_address: "New York, New York, USA",
results[6].formatted_address: "New York, USA",
results[7].formatted_address: "United States"
```

If at least one address was found, it returns a JSON with a address corresponding to the geocode. Assuming a this `40.714224,-73.961452`
as the `latlng` parameter, we would have a JSON like:

```JSON
[  
   {  
      "address_components":[  ],
      "formatted_address":"277 Bedford Ave, Brooklyn, NY 11211, USA",
      "geometry":{  
         "location":{  
            "H":40.714232,
            "L":-73.9612889
         },
         "location_type":"ROOFTOP",
         "viewport":{  
            "Ka":{  
               "H":40.7128830197085,
               "j":40.7155809802915
            },
            "Ga":{  
               "j":-73.96263788029148,
               "H":-73.95993991970852
            }
         }
      },
      "place_id":"ChIJd8BlQ2BZwokRAFUEcm_qrcA",
      "types":[  
         "street_address"
      ]
   }
]
```

The `convertToJson()`function, accepts an object. So, if you want a JSON with all the addresses found in all levels of precision, you can
pass the entire object on `results` parameter:
```javascript
 if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        convertToJson(results);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  }
```
