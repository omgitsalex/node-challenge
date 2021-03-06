'use strict'

const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

module.exports = {
	scrape
}

function scrape(count = 10, callback) {
	const urlPrefix = "https://www.npmjs.com/browse/depended?offset=";
	let numberOfRequests = Math.ceil(count / 36);
	let packages = [];

	async.times(numberOfRequests, (n, next) => {
		let urlOffset = n * 36;
		let url = urlPrefix + urlOffset;
		
		request(url, (err, response, body) => {
			if (!err) {
				let $ = cheerio.load(body);

				$('a.name').filter(function() {
					let obj = { name: "" };
					obj.name = $(this).text();
					packages.push(obj);
				});

				next();
			} else {
			console.log(err);
			process.exit(1);
			}
		});
	}, (err, results) => {
		if (err) return console.error(err);

		return callback(packages.slice(0, count));
	});
}