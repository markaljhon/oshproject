// Sends response messages via the Send API
const requestHandler = (senderPSID, response) => {
    const request = require('request');
    let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    // Construct the message body
    let requestBody = {
        "recipient": {
            "id": senderPSID
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": requestBody
        }, (err, res, body) => {
        if (!err) {
            console.log(`APP:: Facebook: Message Sent: "${response.attachment.text}"`);
        } else {
            console.error(`APP:: Facebook: Error: Message not sent. (${err})`);
        }
    });
}

module.exports = requestHandler;
