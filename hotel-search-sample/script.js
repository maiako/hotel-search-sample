const search = document.getElementById("search");
const matchList = document.getElementById("cities");

const searchCities = async (searchText) => {
  const res = await fetch("data.json");
  const data = await res.json();
  let cityNames = data[1].entries.map(function (entry) {
    return entry.city;
  });
  console.log(cityNames);

  let matches = data[1].entries.filter((entry) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return entry.city.match(regex) || entry.hotelName.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
  }

  outputHtml(matches);
  outputResults(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
       <div class="card card-body mb-1">
      <h5>"<option value=' ${match.city} (${match.hotelName}) '></option>"  <span class="text-primary"></span></h5>
       </div> 

       `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

const outputResults = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
       <div class="card card-body mb-1">
      <h5>"<option value=' ${match.city} (${match.hotelName}) '></option>"  <span class="text-primary"></span></h5>
       </div> 

       `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchCities(search.value));

const URL = "data.json";
const row = document.querySelector("#results");

function displayEntries(entry) {
  const template = `
  
    <div  class="col-lg-3   bg-white p-6  mb-5  bg-white rounded ">

    <img class="img-fluid img-thumbnail " 
        src="${entry.thumbnail}"  /><span class="rectangular">1/30<i class="far fa-heart fa-1x"data-fa-transform="grow-9  left-80 down-110 up-360 right-80;"     ></i>
       

   </div>

   <div class="col-lg-4  bg-white  p-6 mb-5 bg-white rounded" id="room_details" >

   <p id="hotel_name">${entry.hotelName} </p>
   <p id="rating_details">${entry.ratings.no}  <span class="text">${entry.ratings.text}<em>(1736 reviews)</em></span></p>
   <p id="reviews">Excellent location (9.2/10)</p>

   <section>
   <a class="dropdown-item" href="#">
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
    Hotel </a>
   </section> 
      
   <p id="miles">Paris, 0,2 miles to Champs Elysess </p>

  </div>
  <div class="col-lg-2 bg-white  p-6 mb-5 bg-white rounded border left">

    <p id="deals">Hotel website<br>$${entry.price}</p>
    <p class="more_deals">Agoda<br><h5>$575</h5><h5 id="travelocity"><br>Travelocity<br></h5><h5>$708</h5><hr> </hr><strong>More deals from</strong><br><h4><i class="fas fa-chevron-down"data-fa-transform="left-13 down-18 up-16 right-67" ></i>$575</h4></br></p>
    
          

</div>
<div class="col-lg-3 bg-white p-6 mb-5 bg-white rounded">

<p id="web_price">Hotel website<br><h5 class="dollar">$${entry.price}</h5></p>
<p class="web_price_details">3 nights for  <span class="text_details">$2,119</span><br><h5 id="green_box"><br>View Deal<br></h5></p>

      
</div>
`;

  row.innerHTML += template;
}

const locationOption = document.querySelector("#hotel_location");
function displayCities(hotelCities) {
  const cityTemplate = `
  <div class="card card-body mb-1">
  <h5>"<option value=''> ${hotelCities.city} </option>"<span class="text-primary"></span></h5>
   </div>`;

  locationOption.innerHTML += cityTemplate;

  [].slice.call(hotel_location.options).map(function (hotelCities) {
    if (this[hotelCities.innerText]) {
      hotel_location.removeChild(hotelCities);
    } else {
      this[hotelCities.innerText] = 1;
    }
  }, {});
}

const sortByOption = document.querySelector("#sorting_options");
function displayRecommendations(recommendation) {
  for (let i = 0, l = recommendation.filters.length; i < l; i++) {
    recommendation.filters[i].name;
    var obj = recommendation.filters[i];

    const recommendationsTemplate = `
    <div class="card card-body mb-1">
    <h5>"<option value=''> ${obj.name} </option>"<span class="text-primary"></span></h5>
     </div>`;

    sortByOption.innerHTML += recommendationsTemplate;
  }

  [].slice.call(sorting_options.options).map(function (recommendation) {
    if (this[recommendation.innerText]) {
      sorting_options.removeChild(recommendation);
    } else {
      this[recommendation.innerText] = 1;
    }

    $("#sorting_options").multipleSelect({
      filter: true,
      filterPlaceholder: "Our recommendations",
      placeholder: "Our recommendations",
      maxHeight: 600,
    });
  }, {});
}

const option = document.querySelector("#rooms");
function displayRooms(hotelRooms) {
  const templates = `
  <div class="card card-body mb-1">
  <h5>"<option value=' ${hotelRooms.name} '></option>"  <span class="text-primary"></span></h5>
   </div>`;

  option.innerHTML += templates;
}

function ChangePrice(money) {
  ` ${money.price} `;
  $("#slider-range-min").slider({
    range: "min",
    value: " ",

    max: money.price,

    slide: function (event, money) {
      $("#amount").val("Price" + "                   max.$" + money.value);
      console.log(money.value);
    },
  });
  $("#amount").val(
    "Price:" +
      $(`#slider-range-min`).slider("value") +
      "                       max.$"
  );
}

function showMap(btn) {
  const mapTemplate = `  <div class="modal-body mb-3 p-4">
 <div id="map-container-google-16" class="z-depth-1-half map-container-9"
 style="height: 400px ">
 <iframe
 width="730" height="420"  src= ${btn.mapurl}
    
     frameborder="0" style="border:0" allowfullscreen></iframe>
</div>
</div>
 `;
  document.querySelector(".modal-content").innerHTML = mapTemplate;
}

var date = $("#calendar_in").datepicker({ dateFormat: "DD, mm/dd/yy" }).val();
var date = $("#calendar_in").datepicker("setDate", new Date());
$("#calendar_in").on("change", function () {
  alert($("#calendar_in").val());
});
var date = $("#calendar_out").datepicker({ dateFormat: "DD, mm/dd/yy" }).val();
var date = $("#calendar_out").datepicker("setDate", new Date());
$("#calendar_out").on("change", function () {
  alert($("#calendar_out").val());
});

fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data[1].entries.map(displayEntries);
    data[1].entries.map(ChangePrice);
    data[0].roomtypes.map(displayRooms);
    data[1].entries.map(showMap);
    data[1].entries.map(displayCities);
    data[1].entries.map(displayRecommendations);
  })
  .catch(function (error) {
    console.log(error);
  });
