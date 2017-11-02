'use strict';

const DialogflowApp = require('actions-on-google').DialogflowApp;

const app = new DialogflowApp({request: request, response: response});

const LYRICS_INTENT = 'song.lyrics';
const TITLE_INTENT = 'song.title';
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';
const SPEECH_ARGUMENT = 'speech';

// Define respone base on fired intent.
const responseHandler = (app) => {
  let intent = app.getIntent();

  switch (intent) {
    case LYRICS_INTENT:
      let lyrics = app.getArgument(LYRICS_ARGUMENT);
      app.tell('Lyrics: ' + lyrics);
      break;

    case TITLE_INTENT:
      let title = app.getArgument(TITLE_ARGUMENT);
      app.tell('Title: ' + title);
      break;

    default:
      let speech = app.getArgument(SPEECH_ARGUMENT);
      app.tell('Speech: ' + speech);
      break;
  }
};

// Assign response handler to Dialogflow app.
app.handleRequest(responseHandler);
