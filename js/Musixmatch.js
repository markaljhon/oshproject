// Musixmatch API Handler.

// Import dependencies.
const request = require('request');

const Musixmatch = (options) => {
  let result = '';

  return new Promise(resolve => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(`Musixmatch: Track Received: (${body.message.header.available} tracks) 1st - "${body.message.body.track_list[0].track.track_name}"`);

        body.message.body.track_list.forEach((track, index) => {
          result += `${index + 1}. ${body.message.body.track_list[index].track.track_name}.\n`;
        });
        console.log(`Musixmatch Result: ${result}`);

        resolve(result);
      } else {
        console.error(`Musixmatch: API request not sent. (Status ${response.statusCode}) (${error})`);
      }
    }); // End of callback and request.
  }); // End of Promise.
};

module.exports = Musixmatch;
