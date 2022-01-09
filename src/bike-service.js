export default class BikeService {
  static findBike(distance) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=IP&distance=${distance}&stolenness=stolen`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      })
  }
}


