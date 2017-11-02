'use strict';

// Imports Dialogflow dependencies.
const DialogflowApp = require('actions-on-google').DialogflowApp;

// Imports express dependencies and set up http server.
const express = require('express');
const bodyParser = require('body-parser');
const appExpress = express().use(bodyParser.json()); // creates express http server.

// Sets server port and logs message on success.
appExpress.listen(process.env.PORT || 3002, () => console.log('webhook is listening'))
.on('error', (error) => {
  console.error(error);
});

const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';
const SPEECH_ARGUMENT = 'speech';

// Define respone base on fired intent.
const responseHandler = (appDialogflow, request) => {
  let intent = appDialogflow.getIntent();

  // Get parameters / arguments.
  const parameters = request.body.result.parameters;

  switch (intent) {
    case TITLE_INTENT:
      let lyrics = parameters[LYRICS_ARGUMENT];
      appDialogflow.tell('Lyrics: ' + lyrics);
      break;

    case LYRICS_INTENT:
      let title = parameters[TITLE_ARGUMENT];
      appDialogflow.tell('Title: ' + title);
      break;

    default:
      let speech = request.body.result.fulfillment.speech;
      appDialogflow.tell('Speech: ' + speech);
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
