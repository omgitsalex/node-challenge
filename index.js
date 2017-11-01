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
		(callback) => {
			scraperService.scrape(count, (data) => {
				callback(null, data);
			})
		},
		(data, callback) => {
			downloadService.downloadAndExtractPackages(data, (results) => {
				callback(null, results); // no-op
			})
		}
	], (err, results) => {
		fs.removeSync('./tmp');
		return callback();
	});
}