'use strict'

const request = require('request');
const cheerio = require('cheerio');
const url = "https://www.npmjs.com/browse/depended";

module.exports = scraper

function scraper(count = 10, callback) {
	let numberOfRequests = Math.ceil(count / 36);

	request(url, function(err, response, body) {
		if (!err) {
			let $ = cheerio.load(body);
			let packages = [];

			$('a.name').filter(function() {
				let obj = { name: "" };
				obj.name = $(this).text();
				packages.push(obj);
			});

			return callback(packages.slice(0, count));
		} else {
			console.log(err);
			process.exit(1);
		} 
	});
}