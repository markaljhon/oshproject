// Musixmatch API Handler.

// Import dependencies.
const request = require('request');
const requestHandler = require('./RequestHandler.js');

class Musixmatch {
    constructor(senderPSID, query) {
        this.API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;
        this.senderPSID = senderPSID;
        this.options = {
            method: "GET",
            uri: "https://api.musixmatch.com/ws/1.1/track.search",
            qs: {
                "format": "json",
                "q": query,
                "apikey": API_KEY_MUSIXMATCH
            },
            json: true
        };

        request(options, this.callbackTrackSearch);
    }

    const callbackTrackSearch = (error, response, body) => {
        let message;

        if (!error && response.statusCode === 200) {
            console.log(`APP:: Musixmatch: Track Received: (${body.message.header.available} tracks) 1st - "${body.message.body.track_list[0].track.track_name}"`);

            body.message.body.track_list.forEach((track, index) => {
                message.text += `${index}. ${track.track_name}.\n`;
            });

            requestHandler(this.senderPSID, message);
        } else {
            console.error(`APP:: Musixmatch: API request not sent. (Status ${response.statusCode}) (${error})`);
        }
    }
}

module.exports = Musixmatch;
