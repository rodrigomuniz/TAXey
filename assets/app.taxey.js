$(document).ready(function() {
	//gmaps api
	initialize()
});


var geocoder;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Não foi possível determinar sua localização");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();

  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results);
        if (results[1]) {
        var indice=0;
        for (var j=0; j<results.length; j++)
        {
            if (results[j].types[0]=='locality')
                {
                    indice=j;
                    break;
                }
            }
        //alert('The good number is: '+j);
        //console.log(results[j]);
        for (var i=0; i<results[j].address_components.length; i++)
            {
                if (results[j].address_components[i].types[0] == "locality") {
                        //this is the object you are looking for
                        city = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        region = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "country") {
                        //this is the object you are looking for
                        country = results[j].address_components[i];
                    }
            }

            //city data
            var humanLocal = city.long_name + ", " + region.long_name + ", " + country.short_name
			$('#city-name').text(humanLocal)
            $('#floatingBarsG').hide

            } else {
              alert("Não foi possível determinar sua localização");
              $('#floatingBarsG').hide
            }
        //}
      } else {
        alert("Geocoder falou. O motivo técnico: " + status);
        $('#floatingBarsG').hide
      }
    });
  }

// if (navigator.geolocation) {
// 	navigator.geolocation.getCurrentPosition(function(position) {
// 		var lat = position.coords.latitude;
// 		var lon = position.coords.longitude;
//         //recuperar nome da cidade
//   },function(){
//     alert("Não consegui acessar sua localização");
//   });
// }