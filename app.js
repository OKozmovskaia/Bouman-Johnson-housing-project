const url = "https://davy-api.herokuapp.com/predict";

let dataBody = {
        "area": 10,
        "property-type": "APARTMENT" ,
        "rooms-number": 2,
        "zip-code": 1000,
        // "garden": true,
        // "equipped-kitchen": true,
        // "furnished": false,
        // "terrace": true,
        // "facades-number": 2
      
    }

  fetch (url, {
    method: "POST",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json; charset=UTF-8 "
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
