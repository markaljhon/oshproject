'use strict';

// Imports Dialogflow dependencies.
const DialogflowApp = require('actions-on-google').DialogflowApp;

// Imports express dependencies and set up http server.
const express = require('express');
const bodyParser = require('body-parser');
const appExpress = express().use(bodyParser.json()); // creates express http server.

// Imports intent handler.
const intentHandler = require('./js/IntentHandler');

// Sets server port and logs message on success.
appExpress.listen(process.env.PORT || 3002, () => console.log('webhook is listening'))
.on('error', (error) => {
  console.error('Webhook failed:' + error);
});

// Define constants for intent names.
const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';

// Assign response based on fired intent.
const actionMap = new Map();
actionMap.set(LYRICS_INTENT, intentHandler.getLyrics);
actionMap.set(TITLE_INTENT, intentHandler.getTitle);

// Creates the endpoint for our webhook.
appExpress.post('/webhook', (request, response) => {
  // Instantiate Dialogflow app.
  const appDialogflow = new DialogflowApp({request: request, response: response});

  // Handle undefined intent. ie. Small Talks.
  // Return default response.
  if (!request.body.result.metadata.intentName) {
    console.log('Undefined intent: ' + request.body.result.fulfillment.speech);
    appDialogflow.tell(request.body.result.fulfillment.speech);
  } else { // Assign response handler for valid intents.
    appDialogflow.handleRequest(actionMap);
  }

  console.log('Request body: \n' + JSON.stringify(request.body));
});
