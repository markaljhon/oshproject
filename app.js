'use strict';

// Imports Dialogflow dependencies.
const DialogflowApp = require('actions-on-google').DialogflowApp;

// Imports express dependencies and set up http server.
const express = require('express');
const bodyParser = require('body-parser');
const appExpress = express().use(bodyParser.json()); // creates express http server.

// Imports intent handlers.
const getTitle = require('./js/IntentHandler').getTitle;
const getLyrics = require('./js/IntentHandler').getLyrics;

// Sets server port and logs message on success.
appExpress.listen(process.env.PORT || 3002, () => console.log('webhook is listening'))
.on('error', (error) => {
  console.error('Webhook failed:' + error);
});

// Define constants. Intent names.
const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';

// Define respone base on fired intent.
const responseHandler = (appDialogflow, request, response) => {
  let intent = appDialogflow.getIntent();
  let responseJson = {};

  // Get parameters / arguments.
  const parameters = request.body.result.parameters;

  switch (intent) {
    case TITLE_INTENT:
      getTitle(parameters,
        (result) => {
          appDialogflow.tell('Result: \n' + result);
        }
      );
      break;

    case LYRICS_INTENT:
      getLyrics(parameters,
        (result) => {
          appDialogflow.tell('Result: \n' + result);
        }
      );
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
  appDialogflow.handleRequest(responseHandler(appDialogflow, request, response));

  console.log('Request body: \n' + JSON.stringify(request.body));
});
