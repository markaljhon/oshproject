// Send request to Musixmatch API.

// Import dependencies.
const request = require('request');
const requestHandler = require('./RequestHandler.js');

//Search music track. (track.search)
const trackSearch = (senderPSID, strLyrics) => {
    let API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

    request({
        "uri": "https://api.musixmatch.com/ws/1.1/track.search",
        "qs": {
            "format": "json",
            "qtrack": "Antukin",
            "qlyrics": strLyrics,
            "apikey": API_KEY_MUSIXMATCH
        },
        "method": "GET",
        "json": true
        }, (err, res, body) => {
        if (!err) {
            console.log(`APP:: Musixmatch: API Request Sent: "Status Code ${res.statusCode}"`);
            console.log(`APP:: Musixmatch: JSON Received: "${body.message.body.track_list[0].track.track_name}"`);
            console.log(`APP:: Musixmatch: (${body.message.header.available}) JSON Received: "LYRICS: ${strLyrics}"`);
            sendResult(senderPSID, JSON.parse(body));
        } else {
            console.error(`APP:: Musixmatch: Error: API request not sent. (${err})`);
        }
    });
}

// Send all results to user.
const sendResult = (senderPSID, jsonMusix) => {
    let strResponse = "";
    let response;

    jsonMusix.message.body.track_list.forEach((track, index) =>{
        strResponse += `${index}. ${track.track_name}.\n`;
    });

    // for (var i = 0; i < jsonMusix.message.header.available; i++) {
    //     strResponse += `${i}. ${jsonMusix.message.body.track_list[i].track.track_name}}.\n`;
    // }

    console.log(`APP:: Musixmatch: (${jsonMusix.message.header.available}) Response: ${strResponse}`)

    response = { "text": strResponse }
    requestHandler(senderPSID, response);
}

module.exports = trackSearch;
