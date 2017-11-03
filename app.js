'use strict';

// Imports Dialogflow dependencies.
const DialogflowApp = require('actions-on-google').DialogflowApp;

// Imports express dependencies and set up http server.
const express = require('express');
const bodyParser = require('body-parser');
const appExpress = express().use(bodyParser.json()); // creates express http server.

// Imports intent handlers.
const getTitle = require('./js/IntentHandler').getTitle;

// Sets server port and logs message on success.
appExpress.listen(process.env.PORT || 3002, () => console.log('webhook is listening'))
.on('error', (error) => {
  console.error('Webhook failed:' + error);
});

const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';

// Define respone base on fired intent.
const responseHandler = (appDialogflow, request) => {
  let intent = appDialogflow.getIntent();

  // Get parameters / arguments.
  const parameters = request.body.result.parameters;
  let result;

  switch (intent) {
    case TITLE_INTENT:
      getTitle(parameters[LYRICS_ARGUMENT], parameters[ARTIST_ARGUMENT]).then(
        result => { // Success.
          appDialogflow.tell('Result: \n' + result);
        },
        result => { // Failed.
          appDialogflow.tell('Response empty: \n' + result);
        }
      );
      break;

    case LYRICS_INTENT:
      result = getTitle(parameters[TITLE_ARGUMENT], parameters[ARTIST_ARGUMENT]);
      appDialogflow.tell('Result: \n' + result);
      break;

    default:
      let speech = request.body.result.fulfillment.speech;
      appDialogflow.tell(speech);
      break;
  }
};

// Creates the endpoint for our webhook.
appExpress.post('/webhook', (request, response) => {
  // Instantiate Dialogflow app and assign response handler.
  const appDialogflow = new DialogflowApp({request: request, response: response});
  appDialogflow.handleRequest(responseHandler(appDialogflow, request));

  console.log('Request body: ' + JSON.stringify(request.body));
  console.log(`Response: ${response}`);
});
