// // Send request to Musixmatch API.
//
// // Import dependencies.
// const request = require('request');
// const requestHandler = require('./RequestHandler.js');
//
// //Search music track. (track.search)
// const trackSearch = (senderPSID, strQuery) => {
//     let API_KEY_MUSIXMATCH = process.env.API_KEY_MUSIXMATCH;
//     let options = {
//         method: "GET",
//         uri: "https://api.musixmatch.com/ws/1.1/track.search",
//         qs: {
//             "format": "json",
//             "q": strQuery,
//             "apikey": API_KEY_MUSIXMATCH
//         },
//         json: true
//     };
//
//     request(options, callbackTrackSearch);
// }
//
// // Track search callback.
// const callbackTrackSearch = (error, response, body) => {
//     let message;
//
//     if (!error && response.statusCode === 200) {
//         console.log(`APP:: Musixmatch: Track Received: (${body.message.header.available} tracks) 1st - "${body.message.body.track_list[0].track.track_name}"`);
//
//         body.message.body.track_list.forEach((track, index) => {
//             message.text += `${index}. ${track.track_name}.\n`;
//         });
//
//         requestHandler(senderPSID, message);
//     } else {
//         console.error(`APP:: Musixmatch: API request not sent. (Status ${response.statusCode}) (${error})`);
//     }
// }
//
// // Send all results to user.
// const sendResult = (senderPSID, jsonMusix) => {
//     let strResponse = "";
//     let response;
//
//     jsonMusix.message.body.track_list.forEach((track, index) =>{
//         strResponse += `${index}. ${track.track_name}.\n`;
//     });
//
//     // for (var i = 0; i < jsonMusix.message.header.available; i++) {
//     //     strResponse += `${i}. ${jsonMusix.message.body.track_list[i].track.track_name}}.\n`;
//     // }
//
//     console.log(`APP:: Musixmatch: (${jsonMusix.message.header.available}) Response: ${strResponse}`)
//
//     response = { "text": strResponse }
//     requestHandler(senderPSID, response);
// }
//
// module.exports = trackSearch;
