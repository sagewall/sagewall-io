mapboxgl.accessToken = 'pk.eyJ1Ijoic2FnZXdhbGwiLCJhIjoiMjRhNDExZWMwY2M1NzFlOTYxZWJjNjRiZTBhZGQ2NDEifQ.85AyZco3_blL_yZ0dv3Bog';

var map = new mapboxgl.Map({
  container: 'mapDiv',
  style: 'mapbox://styles/sagewall/ciphm32fr000ybjm5rhsz8hmx',
  center: [-104.99, 39.74],
  zoom: 15
});

console.log(map.queryRenderedFeatures());

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['parcels'] });
  if (!features.length) {
    console.log('No parcels found');
  } else {
    $.each(features, function(index, value){
      new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setHTML(value.properties.PIN)
        .addTo(map);
    });
  }
});

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['parcels'] });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});