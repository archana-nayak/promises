/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');


// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath, callback) {
  // TODO
  fs.readFile(filePath, 'utf8' , function(error, result) {
  	if (error) {
  		callback(error, result);
  	} else {
  	// console.log('result ', result);
	  	var firstLine = result.split('\r\n')[0];
			// console.log('value retrieved from file read ', firstLine);
			callback(error, firstLine);
	  }
  });

};

var promisePluckLine = Promise.promisify(pluckFirstLineFromFileAsync)
// .then(function(result) {
// 	return result;
// })
// .catch(function(error) {
// 	return error;
// });


// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {

  request(url, {json: true}, (err, response, body) => {

  	// var statusCode = response.statusCode;
  	// console.log('statusCode ', statusCode);
  	if (err) {
  		callback(err);
  	} 
	  
	  callback(err, response.statusCode);
  	
  });		

};

var promiseGetStatusCode = Promise.promisify(getStatusCode);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: promiseGetStatusCode,//getStatusCodeAsync,
  pluckFirstLineFromFileAsync: promisePluckLine//pluckFirstLineFromFileAsync
};
