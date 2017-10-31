'use strict';

module.exports = downloader;
const { exec } = require('child_process');
const fs = require('fs');
const tarball = require('tarball-extract');
const tarballDirectory = './tmp';
const destinationDirectory = './packages';

function downloader(packageArray, callback) {
	if (!fs.existsSync(tarballDirectory)) {
		fs.mkdirSync(tarballDirectory);
	}

	if(!fs.existsSync(destinationDirectory)) {
		fs.mkdirSync(destinationDirectory);
	}

	packageArray.forEach(function(element) {
		exec(`npm view ${element.name} dist.tarball`, function(err, stdout, stderr) {
			if (!err) {
				let url = stdout;
			
				tarball.extractTarballDownload(url, `${tarballDirectory}/${element.name}.tgz`, `${destinationDirectory}/${element.name}`, {}, function(err, result) {});
			} else {
				// TODO: add error handling here
			}
		});
	});

	return callback();
}