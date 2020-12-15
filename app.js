const form = document.querySelector('.form');
 
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formEvent = event.target;
  const url = "https://davy-api.herokuapp.com/predict";
  const urlCORS = "https://cors-anywhere.herokuapp.com/";
  

  // get values from formData
  let formData = new FormData(formEvent);

  // delete the empty-string
  for(let pair of formData.entries()){
    if(pair[1] == ""){
      formData.delete(pair[0]);
    };
  };

  const plainFormData = Object.fromEntries(formData.entries());

  // convert to int and boolean
  function replacer(key, value) {
    if (!isNaN(value)) {
      return parseInt(value);
    }

    if (value === "true") {
      return Boolean(value);
    }
    return value;
  }

  const dataBodyFetch = JSON.stringify(plainFormData, replacer);

  console.log(dataBodyFetch);

  fetch (urlCORS + url, {
        method: "POST",
        body: dataBodyFetch,
        headers: {
          "Content-Type": "application/json; charset=UTF-8 "
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.Predicted_price);
        const price = Number(json.Predicted_price);
        
        const priceContainer = document.querySelector(".price-container");
        priceContainer.classList.remove("hide");
        priceContainer.innerHTML = `
        <p>Approximate cost: ${price} EUR</p>
        `;
      })
      .catch(err => console.log(err));
  
});
