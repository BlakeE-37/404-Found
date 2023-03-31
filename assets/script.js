// function test() {
//     var query = 'news'

//     const url = "https://api.newscatcherapi.com/v2/search?" + new URLSearchParams({
//         q: query,
//         page_size: 20
//     });
//     fetch(url, {
//         method: "GET",
//         headers: {
//             "x-api-key": "6XDeYVf8IA4XMhv7FFkL7LXdZvm61crB7KpC1zGTB8w"
//         }
//     })
//         .then(function (response) {
//             return response.json();

//         })
//         .then(function (data) {
//             console.log(data);
//         })
// };

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(console.log, console.log);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

getLocation();
// test();