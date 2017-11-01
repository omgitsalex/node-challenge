'use strict'

module.exports = download
const downloader = require('./downloader.js');
const scraper = require('./scraper.js');
const async = require('async');
const rimraf = require('rimraf');
const request = require('request');

function download(count, callback) {
	async.waterfall([
		function(callback) {
			scraper(count, function(data) {
				callback(null, data);
			})
		},
		function(data, callback) {
			downloader(data, function(results) {
				callback(null, results);
			})
		}
	], function(err, results) {
		rimraf('./tmp', function() {})
		return callback();
	});
}