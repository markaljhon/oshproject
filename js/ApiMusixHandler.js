// Send request to Musixmatch API.

// Import dependencies.
const request = require('request');

//Search music track. (track.search)
const trackSearch = (strLyrics) => {
    let API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

    request({
        "uri": `https://api.musixmatch.com/ws/1.1/track.search?format=json&qlyrics=${strLyrics}&apikey${API_KEY_MUSIXMATCH}`
        }, (err, res, body) => {
        if (!err) {
            console.log(`APP:: Request Sent: "${res}"`);
        } else {
            console.error(`APP:: Error: Message not sent. (${err})`);
        }
    });
}

module.exports = trackSearch;
