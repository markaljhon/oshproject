// Handles messaging_postbacks events
const postBackHandler = (sender_psid, received_postback) => {
    const requestHandler = require('./RequestHandler.js');
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }

    switch (payload) {
        case 'yes':
            response = { "text": "Thanks!" }
            break;
        case 'no':
            response = { "text": "Feed me some lyrics. I'm hungry. :)" }
            break;
        default:
            response = { "text": "Sorry, I can't handle that." }
    }
    // Send the message to acknowledge the postback
    requestHandler(sender_psid, response);
}

module.exports = postBackHandler;
