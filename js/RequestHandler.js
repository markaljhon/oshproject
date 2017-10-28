// Sends response messages via the Send API
const requestHandler = (sender_psid, response) => {
    const request = require('request');
    let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
        }, (err, res, body) => {
        if (!err) {
            console.log('APP:: Message Sent: "${response.text}"');
        } else {
            console.error("APP:: Error: Message not sent. (${err})");
        }
    });
}

module.exports = requestHandler;
