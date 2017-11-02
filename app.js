'use strict';

// Imports Dialogflow dependencies and instantiate one.
const DialogflowApp = require('actions-on-google').DialogflowApp;
const appDialogflow = new DialogflowApp({request: request, response: response});

// Imports express dependencies and set up http server.
const express = require('express');
const bodyParser = require('body-parser');
const appExpress = express().use(bodyParser.json()); // creates express http server.

const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';
const SPEECH_ARGUMENT = 'speech';

// Define respone base on fired intent.
const responseHandler = (appDialogflow) => {
  let intent = appDialogflow.getIntent();

  switch (intent) {
    case LYRICS_INTENT:
      let lyrics = appDialogflow.getArgument(LYRICS_ARGUMENT);
      appDialogflow.tell('Lyrics: ' + lyrics);
      break;

    case TITLE_INTENT:
      let title = appDialogflow.getArgument(TITLE_ARGUMENT);
      appDialogflow.tell('Title: ' + title);
      break;

    default:
      let speech = appDialogflow.getArgument(SPEECH_ARGUMENT);
      appDialogflow.tell('Speech: ' + speech);
      break;
  }
};

// Assign response handler to Dialogflow appDialogflow.
appDialogflow.handleRequest(responseHandler);

// Sets server port and logs message on success.
appExpress.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Server index page
appExpress.get('/', (req, res) => {
  appDialogflow.handleRequest(responseHandler);

  res.send('Deployed!');
  console.log('Deployed!');
});
