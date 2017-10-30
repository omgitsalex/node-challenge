'use strict'

const request = require('request');
const cheerio = require('cheerio');
const url = "https://www.npmjs.com/browse/depended";

module.exports = scraper

function scraper (count, callback) {
	request(url, function(error, response, body) {
		if (!error) {
			let $ = cheerio.load(body);
			let packages = [];

			$('a.name').filter(function() {
				let obj = { name: "" }
				obj.name = $(this).text();
				packages.push(obj);
			})

			console.log(packages);
		}
	})
}

scraper(10);
