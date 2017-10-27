// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    const requestHandler = require('./js/RequestHandler.js');
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    requestHandler.handleRequest(sender_psid, response);
}
