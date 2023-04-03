// On Website-Load we need to check for location and load local news articles
//      // convert Geo-Location to an actual usable location for newscatcher filtering
//      // save Geo-Location permissions to local storage

// we need to set up a function for Jquery to add the news articles as a list to the page

// We need to have an event listeners for a button that will reload the news articles based on seach criteria typed by the user
//      // Criteria includes --- Title/keywords, Date, location, news source
//      // |-> also sort the list of articles by relevance, or other ways based on what newscatcher has


function onLoad() {
    getLocation();
    catchTheNews();
    // displayArticles();
    // // Impliment Local Storage display in displayArticles();
    // 
    return;
}


function catchTheNews() {
    var query = 'news'

    const url = "https://api.newscatcherapi.com/v2/search?" + new URLSearchParams({
        q: query,
        page_size: 20
    });
    fetch(url, {
        method: "GET",
        headers: {
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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(console.log, console.log);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

getLocation();
// test();