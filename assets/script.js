// On Website-Load we need to check for location and load local news articles
//      // convert Geo-Location to an actual usable location for newscatcher filtering
//      // save Geo-Location permissions to local storage

// we need to set up a function for Jquery to add the news articles as a list to the page

// We need to have an event listeners for a button that will reload the news articles based on seach criteria typed by the user
// ---CSS TEAM--- // Criteria includes --- Title/keywords, Date, location, news source
// ---CSS TEAM--- // dropedown? -> Sort the list of articles by relevance, or other ways based on what newscatcher has

function displayArticles() {
    // function using jQuery that simply displays the articles, no filtering here
    return;
}

function catchTheNews(location = "", keyword = 'school') {
    // variables for query parameters
    const url = "https://api.newscatcherapi.com/v2/search?" + new URLSearchParams({
        q: location + " AND " + keyword,
        lang: 'en',
        page_size: 20,
    });
    fetch(url, {
        method: "GET",
        headers: {
            // Blake's API KEY --- Will get replaced with gibby's
            "x-api-key": "frpBqZeRsHEjJuDlD91N1HC-7DbJex5ZtyETKeIYfWA"
        }
    })
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
        })
};
// function to turn our latitude and longitude coordinates into a usuable location
function googleApiCall(position) {
    const { latitude, longitude } = position.coords;
    const googleApiKey = "AIzaSyDxCSpACr0DrCHKIo_rpjo1KiUntK9Vi5E"
    const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + googleApiKey;
    fetch(googleURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var dataArray = data.results[0].address_components[4].long_name;
            console.log(dataArray);
        })
}

// uses geolocation to ask for location permission from the user and returns the latitude and longitude
function getLocation() {
    // Local storage for location and location permission??? Needs researched.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(googleApiCall, console.log);
    } else {
        //TODO : Needs to be deleted or changed to a modal
        alert("Location usage is not supported by this browser.");
    }
}

function onLoad() {
    getLocation();
    // catchTheNews('utah');
    // displayArticles();
    return;
}

// function only called once on initial webpage load 
onLoad();