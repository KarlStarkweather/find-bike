import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from '../src/bike-service';

function clearFields() {
  $('#searchDistance').val("");
  $('.results').text("");
}

function getDescriptions(response) {
  let descr = "";
  for (let i = 0; i < response.bikes.length; i++) {
    let bikeImage = "https://cdn.pixabay.com/photo/2014/04/03/11/07/bicycle-311808_960_720.png";
    let coordinate = "";
    let description = "";
    if (response.bikes[i].thumb !== null) {
      bikeImage = response.bikes[i].thumb;
    }
    if (response.bikes[i].stolen_coordinates !== null) { 
      coordinate= response.bikes[i].stolen_coordinates;
    }
    let d = new Date((response.bikes[i].date_stolen*1000));
    let shortDate = d.toLocaleDateString('en-US');
    if (response.bikes[i].description !== null) {
      description = `<p class="card-text">${response.bikes[i].description}</p>`;
    }
    descr += `
    <div class="col">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top img-thumbnail" src="${bikeImage}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${response.bikes[i]["title"]}</h5>
          ${description}
          <ul>
            <li><strong>Manufacturer:</strong> ${response.bikes[i].manufacturer_name}</li>
            <li><strong>Year of manufacture:</strong> ${response.bikes[i].year}</li>
            <li><strong>Reported Stolen:</strong> ${shortDate}</li>
            <li><strong>Where it was Stolen:</strong> ${coordinate}</li>
            <li><strong>Serial Number:</strong> ${response.bikes[i].serial}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
  }
  return descr;
}

$(document).ready(function() {
  $('#findBike').submit(function(event) {
    event.preventDefault();
    let distance = $('#searchDistance').val();
    let zipCode = $('#searchZip').val();
    clearFields();
    BikeService.findBike(distance, zipCode)
      .then(function(response) {
        if (response.bikes) {
          let descriptions = getDescriptions(response);
          $('#results').html(`<p>${response.bikes.length} bikes stolen in this area, the following descriptions were found:</p>${descriptions}`);
        } else {
          $('#errors').text(`There was an error: ${response.message}`);
        }
      });
  });
});


