// Handles messages events
const  messageHandler = (sender_psid, received_message) => {
    const requestHandler = require('./RequestHandler.js');
    let response;

    // Log PSID
    console.log('APP:: Sender PSID: ${sender_psid}');

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }

        // Log message text
        console.log('APP:: Message Received: "${received_message.text}"';
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
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
                        ],
                    }]
                }
            }
        }
    }

    // Send the response message
    requestHandler(sender_psid, response);
}

module.exports = messageHandler;
