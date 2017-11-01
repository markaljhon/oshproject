// Handles messages events
const  messageHandler = (senderPSID, receivedMessage) => {
    // Import dependencies.
    const requestHandler = require('./RequestHandler.js');
    const trackSearch = require('./Musixmatch.js');
    let response;

    // Log PSID
    console.log(`APP:: Sender PSID: ${senderPSID}`);

    // Checks if the message contains text
    if (receivedMessage.text) {
        trackSearch(senderPSID, receivedMessage.text);
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type":"button",
                    "text":"Is that the Song Lyrics?",
                    "buttons":[
                        {
                            "type": "postback",
                            "title": "Yes",
                            "payload": "yes",
                        },
                        {
                            "type": "postback",
                            "title": "No",
                            "payload": "no",
                        }
                    ]
                }
            }
        }

        // Log message text
        console.log(`APP:: Message Received: "${receivedMessage.text}"`);
    } else if (receivedMessage.attachments) {
        // Get the URL of the message attachment
        let attachmentURL = receivedMessage.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the attachment?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachmentURL,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes",
                                "payload": "default",
                            },
                            {
                                "type": "postback",
                                "title": "No",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }

        // Log message text
        console.log(`APP:: Attachment Received: "${attachmentURL}"`);
    }

    // Send the response message
    requestHandler(senderPSID, response);
}

module.exports = messageHandler;
