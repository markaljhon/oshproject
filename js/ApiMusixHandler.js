// Send request to Musixmatch API.

// Import dependencies.
const request = require('request');

//Search music track. (track.search)
const trackSearch = (strLyrics) => {
    let API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

    request({
        "uri": "https://api.musixmatch.com/ws/1.1/track.search",
        "qs": {
            "format": "json",
            "qlyrics": strLyrics,
            "apikey": API_KEY_MUSIXMATCH
        },
        "method": "GET",
        "json": true
        }, (err, res, body) => {
        if (!err) {
            console.log(`APP:: Musixmatch: API Request Sent: "${res.statusCode}"`);
            console.log(`APP:: Musixmatch: JSON Received: "${body.message.body.track_list.track[0].track_name}"`);
        } else {
            console.error(`APP:: Musixmatch: Error: API request not sent. (${err})`);
        }
    });
}

module.exports = trackSearch;
