// Handles intent actions.

// Import dependencies.
const Musixmatch = require('./Musixmatch.js');

// Musixmatch API key.
const API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

// Define constants. Argument names.
const LYRICS_ARGUMENT = 'lyrics';
const TITLE_ARGUMENT = 'title';
const ARTIST_ARGUMENT = 'artist';

const getTitle = (parameters, callback) => {
  let lyrics = parameters[LYRICS_ARGUMENT] || '';
  let artist = parameters[ARTIST_ARGUMENT] || '';

  let options = {
    method: 'GET',
    uri: 'https://api.musixmatch.com/ws/1.1/track.search',
    qs: {
      'format': 'json',
      'q_artist': artist,
      'q_lyrics': lyrics,
      'apikey': API_KEY_MUSIXMATCH
    },
    json: true
  };

  callback(Musixmatch(options));
};

const getLyrics = (parameters, callback) => {
  let title = parameters[TITLE_ARGUMENT] || '';
  let artist = parameters[ARTIST_ARGUMENT] || '';

  let options = {
    method: 'GET',
    uri: 'https://api.musixmatch.com/ws/1.1/track.search',
    qs: {
      'format': 'json',
      'q_track': title,
      'q_artist': artist,
      'apikey': API_KEY_MUSIXMATCH
    },
    json: true
  };

  callback(Musixmatch(options));
};

module.exports = {getTitle, getLyrics};
