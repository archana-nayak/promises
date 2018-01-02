/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
var urlParser = require('url');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
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

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
