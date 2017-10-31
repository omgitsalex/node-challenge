'use strict'

module.exports = download
const scraper = require('./scraper.js');
const downloader = require('./downloader.js');
const async = require('async');
const rimraf = require('rimraf');

function download(count, callback) {
	async.waterfall([
		function(callback) {
			scraper(count, function(data) {
				callback(null, data);
			})
		},
		function(data, callback) {
			downloader(data, function(results) {
				// cleans up temporary directory
				rimraf('./tmp', function() {})

				callback(null, results);
			})
		}
	], function(err, results) {});

	return callback();
}