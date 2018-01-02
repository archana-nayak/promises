/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
// var Promisification = require('../promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  console.log('writeFilePath ', writeFilePath);
  var readFile = function(readFilePath) {
	  return new Promise(function(resolve, reject) {
	  	fs.readFile(readFilePath, 'utf8', function(err, contents) {
	  		if (err) {
	  			return reject(err);
	  		}
	  		var firstLine = contents.split('\n\r')[0];
	  		console.log('contents', firstLine);
	  		return resolve(firstLine);
	  	});
	  });
	};

	var getGitHubProfileAsync = function(user) {
		return new Promise(function(resolve, reject) {
			var options = {
		    url: 'https://api.github.com/users/' + user,
		    headers: { 'User-Agent': 'request' },
		    json: true  // will JSON.parse(body) for us
	  	};

		  request.get(options, function(err, res, body) {
		    if (err) {
		      return reject(err);
		    } else if (body.message) {
		      return reject(new Error('Failed to get GitHub profile: ' + body.message));
		    } else {
		    	console.log('body ', body);
		      return resolve(body);
		    }
		  });
		});
	};
	
	var writeFile = function(writeFilePath) {
		return new Promise(function(resolve, reject) {
			fs.writeFile(writeFilePath, function(err) {
				if (err) {
					return reject(err);
				}
				return resolve();
			});	
		});
	};

	var errorHandler = function (err) {
		if (err) {
			throw new Error(err);
		}
	}

	readFile(readFilePath)
		.then(getGitHubProfileAsync)
			.then(writeFile(writeFilePath))
				.catch(errorHandler);  

};
 var fetchProfileAndWriteToFileAsync = Promise.promisify(fetchProfileAndWriteToFile);
// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFileAsync
};
