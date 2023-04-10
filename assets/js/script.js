var submitSearch = document.getElementById("submit");
var globalVarLocation = "US";

function searchNews() {
    var searchBox = document.getElementById("search").value
    if (searchBox) {
        catchTheNews(globalVarLocation, searchBox)
    }
}


function catchTheNews(location = "US", keyword = 'news') {
    // variables for query parameters
    const url = "https://api.newscatcherapi.com/v2/search?" + new URLSearchParams({
        q: location + " AND " + keyword,
        lang: 'en',
        page_size: 20,
    });
    fetch(url, {
        method: "GET",
        headers: {
            //Blake's API key for the Newcatcher API
            "x-api-key": "6XDeYVf8IA4XMhv7FFkL7LXdZvm61crB7KpC1zGTB8w"
        }
    })
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data)
            var newsArticles = document.getElementById('news-articles');
            newsArticles.innerHTML = '';

            for (var i = 0; i < data.articles.length; i++) {
                var article = data.articles[i];

                var articleDiv = document.createElement('div');

                var title = document.createElement('h2');
                title.innerHTML = article.title;

                var author = document.createElement('p');
                author.innerHTML = 'By ' + article.author;

                var description = document.createElement('p');
                description.innerHTML = article.excerpt;

                var url = document.createElement('a');
                url.href = article.link;
                url.innerHTML = 'Read more';
                url.setAttribute("target", "_blank")

                // When a link is pressed that web URL is saved in local storage and saved for when the page is revisited
                url.addEventListener("click",
                    function (event) {
                        event.preventDefault();
                        console.log(this.href);
                        localStorage.setItem("pastUrl", this.href)
                        // Adding the link to local storage prevented the link from working properly, this line below fixes that
                        window.open(this.href, "_blank");
                    })

                articleDiv.appendChild(title);
                articleDiv.appendChild(author);
                articleDiv.appendChild(description);
                articleDiv.appendChild(url);

                newsArticles.appendChild(articleDiv);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


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
            globalVarLocation = dataArray;
            catchTheNews(dataArray);
        })
}

// uses geolocation to ask for location permission from the user and returns the latitude and longitude
function getLocation() {
    // Local storage for location and location permission??? Needs researched.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(googleApiCall, catchTheNews('us', 'news'));
    } else {
        //TODO : Needs to be deleted or changed to a modal
        alert("Location usage is not supported by this browser.");
    }
}

// local storage display function
function displayLocalStorage() {
    if (localStorage.getItem("pastUrl")) {
        var url = localStorage.getItem("pastUrl");
        var lsDisplay = document.getElementById('localStorageSection')
        lsDisplay.setAttribute("class", "continueReading")
        // create local storage elements
        var title = document.createElement('h2');
        title.innerHTML = "Didn't finish Reading?";

        var link = document.createElement('a');
        link.innerHTML = "click here";
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank")

        lsDisplay.appendChild(title)
        lsDisplay.appendChild(link)
    }
}

function onLoad() {
    getLocation();
    displayLocalStorage();
    return;
}

submitSearch.addEventListener("click", searchNews)
// function only called once on initial webpage load 
onLoad();