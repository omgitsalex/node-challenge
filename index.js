'use strict'

module.exports = download
const downloadService = require('./lib/downloadService.js');
const scraperService = require('./lib/scraperService.js');
const async = require('async');
const fs = require('fs-extra');
const request = require('request');
const COUNT = parseInt(process.env.COUNT, 10) || 10;

function download(count, callback) {
	async.waterfall([
		function(callback) {
			scraperService.scrape(count, function(data) {
				callback(null, data);
			})
		},
		function(data, callback) {
			downloadService.downloadAndExtractPackages(data, function(results) {
				callback(null, results);
			})
		}
	], function(err, results) {
		fs.removeSync('./tmp');
		return callback();
	});
}