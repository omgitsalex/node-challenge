'use strict'

module.exports = downloader
const { exec } = require('child_process');
const request = require('request');
const fs = require('fs');
const tarballDirectory = './tarballs';

function downloader(packageArray, callback) {
	if (!fs.existsSync(tarballDirectory)) {
		fs.mkdirSync(tarballDirectory);
	}

	packageArray.forEach(function(element) {
		console.log(`downloading tarball for ${element.name}...`)
		exec(`npm view ${element.name} dist.tarball`, function(err, stdout, stderr) {
			request
				.get(stdout)
				.pipe(fs.createWriteStream(`./${tarballDirectory}/${element.name}.tgz`))
		});
	})
}

downloader([{name: 'lodash'}, {name: 'request'}])