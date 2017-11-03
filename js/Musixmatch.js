// Musixmatch API Handler.

// Import dependencies.
const request = require('request');

const Musixmatch = (options) => {
  let result = '';

  return new Promise(resolve => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        body.message.body.track_list.forEach((track, index) => {
          result += `${index + 1}. ${body.message.body.track_list[index].track.track_name}.\n`;
        });

        resolve(body.message.body.track_list[0].track.track_name);
        console.log(`Musixmatch Result: \n${result}`);
      } else {
        console.error(`Musixmatch: API request not sent. (Status ${response.statusCode}) (${error})`);
      }
    }); // End of callback and request.
  }); // End of Promise.
};

module.exports = Musixmatch;
