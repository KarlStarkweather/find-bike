import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from '../src/bike-service';

function clearFields() {
  $('#searchDistance').val("");
  $('.results').text("");
}

// function getDescriptions(bikes) {
//   bikes.array.forEach(element => {
//     let d = d & element & '/n';
//   });
// }

$(document).ready(function() {
  $('#findBike').submit(function(event) {
    event.preventDefault();
    let distance = $('#searchDistance').val();
    clearFields();
    BikeService.findBike(distance)
      .then(function(response) {
        if (response.bikes) {
          $('#results').text(`${response.bikes.length} bikes found in this area, the first description is: ${response.bikes[2]["description"]}`);
        } else {
          $('#errors').text(`There was an error: ${response.message}`);
        }
      })
  });
});

