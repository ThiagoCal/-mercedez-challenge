import { Controller } from "stimulus"
import mapboxgl from "!mapbox-gl"

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?type=poi&proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGhpYWdvY2FsIiwiYSI6ImNremlwaTZpMzAyZzUydXFrbWs5ajBqYmIifQ.CwOdjNi0qczMJuXQ-096DA"
export default class extends Controller {
  static targets = [ "lat", "lng", "output" ]
  static values = {
    apiKey: String
  }
  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    fetch(url)
      .then(response => response.json())
      .then((data) => {

        // const objectifier = Object.assign({}, result)
        data.forEach(result)


        // Object.values(objectifier).forEach((resultJSON) => {
        //  outputHTML += outputTemplate(resultJSON);
        // });
        // this.outputTarget.innerHTML = outputHTML;
      });
      //   const result = data.data.results
      //   const objectifier = Object.assign({}, result)


      //   // document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;
      //   // this.outputTarget.innerText = data
      // }).then( output => {

  }
}

// function getLatLgn(lat, lng){
//   this.latTarget.value = lat
//   this.lngTarget.value = lng
//   if (lat&&lng !== ""){
//     url = `https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?type=poi&proximity=${lng},${lat}&access_token=pk.eyJ1IjoidGhpYWdvY2FsIiwiYSI6ImNremlwaTZpMzAyZzUydXFrbWs5ajBqYmIifQ.CwOdjNi0qczMJuXQ-096DA`
//     fetch(url)
//     .then(response => response.json())
//     .then((data) => {

//       // const objectifier = Object.assign({}, result)
//       console.log(data)
//   })
// }

// function outputTemplate(museum) {
//   return ` <li>
//       <span class="name">${ museum.name }</span>


//     </li>`;
// }
