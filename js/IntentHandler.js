// Handles intent actions.

// Import dependencies.
const Musixmatch = require('./Musixmatch');

// Musixmatch API key.
const API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

// Define constants. Argument names.
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';
const URI_MUSIXMATCH = 'https://api.musixmatch.com/ws/1.1/track.search';

const getTitle = (app) => {
  let lyrics = app.getArgument(LYRICS_ARGUMENT) || '';
  let artist = app.getArgument(ARTIST_ARGUMENT) || '';

  let options = {
    method: 'GET',
    uri: URI_MUSIXMATCH,
    qs: {
      'format': 'json',
      'q_artist': artist,
      'q_lyrics': lyrics,
      'apikey': API_KEY_MUSIXMATCH
    },
    json: true
  };

  Musixmatch(options).then(result => {
    app.tell('Result: \n' + result);
  });
};

const getLyrics = (app) => {
  let title = app.getArgument(TITLE_ARGUMENT) || '';
  let artist = app.getArgument(ARTIST_ARGUMENT) || '';

  let options = {
    method: 'GET',
    uri: URI_MUSIXMATCH,
    qs: {
      'format': 'json',
      'q_track': title,
      'q_artist': artist,
      'apikey': API_KEY_MUSIXMATCH
    },
    json: true
  };

  Musixmatch(options).then(result => {
    app.tell('Result: \n' + result);
  });
};

module.exports = {getTitle, getLyrics};
