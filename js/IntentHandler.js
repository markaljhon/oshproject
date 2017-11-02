// Handles intent actions.

// Import dependencies.
const Musixmatch = require('./Musixmatch.js');

// Musixmatch API key.
const API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;

const getTitle = (lyrics = '', artist = '') => {
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

  return Musixmatch(options);
};

const getLyrics = (title = '', artist = '') => {
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

  return Musixmatch(options);
};

module.exports = {getTitle, getLyrics};
