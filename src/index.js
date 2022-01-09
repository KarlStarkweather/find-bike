import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from '../src/bike-service';

function clearFields() {
  $('#searchDistance').val("");
  $('.results').text("");
}

$(document).ready(function() {
  $('#findBike#search').submit(function(event) {
    event.preventDefault();
    let distance = $('#searchDistance').val();
    clearFields();
    BikeService.findBike(distance)
      .then(function(response) {
        if (response.bikes) {
          $('#results').text(`${response.bikes.length} bikes found in this area, the first description is: ${response.bikes[0][description]}`);
        } else {
          $('#errors').text(`There was an error: ${response.message}`);
        }
      })
  });
});


// WeatherService.getWeather(city)
//       .then(function(response) {
//         getElements(response);
//       });

// }
// $(document).ready(function() {
//   $('#findBike').click(function() {
//     let city = $('#location').val();
//     $('#searchDistance').val("");
//     clearFields();
// // function getElements(response) {
// //   if (response.main) {
// //     $('.results').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
// //     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
// //   } else {
// //     $('.showErrors').text(`There was an error: ${response.message}`);
// //   }
// // }