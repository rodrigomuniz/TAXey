$(document).ready(function() {
	//gmaps api
	initialize()

    //cria mapa
    var mapcanvas = document.createElement('div');
    mapcanvas.id = 'mapcontainer';
    mapcanvas.style.height = '100px';
    mapcanvas.style.width = '100%';
    document.querySelector('article').appendChild(mapcanvas);

});


var geocoder;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//pega latitude e longitude;
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
        //alert('O melhor número é: '+j);
        //console.log(results[j]);
        for (var i=0; i<results[j].address_components.length; i++)
            {
                if (results[j].address_components[i].types[0] == "locality") {
                        //objeto
                        city = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                        //objeto
                        region = results[j].address_components[i];
                    }
                if (results[j].address_components[i].types[0] == "country") {
                        //objeto
                        country = results[j].address_components[i];
                    }
            }
            //chama o pino
            pinLocal(lat, lng);
            //city data
            var humanLocal = city.long_name + ", " + region.long_name + ", " + country.short_name
			$('#city-name').val(humanLocal);
            $('#floatingBarsG').fadeOut();
            //manda dados da cidade
            cityTax(city.long_name, humanLocal);
            } else {
              alert("Não foi possível determinar sua localização :(");
              $('#floatingBarsG').fadeOut();
            }
        //}
      } else {
        alert("Geocoder falou. O motivo técnico: " + status);
        $('#floatingBarsG').fadeOut();
      }
    });
  }


//drop geolocation pin usando gmaps
function pinLocal(lat, lng) {
    var lat = lat;
    var lng = lng;

    //cria pino
    var coords = new google.maps.LatLng(lat, lng);

  var options = {
    zoom: 15,
    center: coords,
    mapTypeControl: false,
    navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);
  var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title:"Você está aqui!"
  });

}

//qual a cidade geolocalizada?
//exibe as taxas na tabela dependendo da cidade
//será criado um banco de tarifas das capitais
//adaptado para a conexão da campus que acusa Bogota ou Sao Paulo dependendo de onde estamos conectados
function cityTax(cityName) {
    var city = cityName;
    if (city == "Recife" || city == "Sao Paulo" || city == "Bogota") {
        //mostra preco dependendo da cidade localizada
            // ======== programar modelo de estrutura de dados =====
            
            //mostra tabela e botoes
            $('#city').slideDown('slow');
    } else {
        alert('Infelizmente os preços e telefones para a sua localização atual ('+city+') ainda não está nos nossos bancos de dados :(');
    }
}
