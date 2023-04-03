// On Website-Load we need to check for location and load local news articles
//      // convert Geo-Location to an actual usable location for newscatcher filtering
//      // save Geo-Location permissions to local storage

// we need to set up a function for Jquery to add the news articles as a list to the page

// We need to have an event listeners for a button that will reload the news articles based on seach criteria typed by the user
// ---CSS TEAM--- // Criteria includes --- Title/keywords, Date, location, news source
// ---CSS TEAM--- // dropedown? -> Sort the list of articles by relevance, or other ways based on what newscatcher has

function displayArticles() {
    // JQuery function that simply displays the articles, no filtering here
    return;
}

function catchTheNews(geoLocation) {
    // variables for query parameters
    var query = 'news';
    var location = geoLocation;

    const url = "https://api.newscatcherapi.com/v2/search?" + new URLSearchParams({
        q: query,
        page_size: 20
    });
    fetch(url, {
        method: "GET",
        headers: {
            // Blake's API KEY --- Will get replaced with gibby's
            "x-api-key": "6XDeYVf8IA4XMhv7FFkL7LXdZvm61crB7KpC1zGTB8w"
        }
    })
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
        })
};

function getLocation() {
    // Local storage for location and location permission??? Needs researched.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(console.log, console.log);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function onLoad() {
    var location = getLocation();
    catchTheNews(location);
    // displayArticles();
    // // Impliment Local Storage display in displayArticles();
    return;
}

// function only called once on initial webpage load 
onLoad();