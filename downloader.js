'use strict';

module.exports = downloader;
const { exec } = require('child_process');
const fs = require('fs-extra');
const tarball = require('tarball-extract');
const tarballDirectory = './tmp';
const destinationDirectory = './packages';
const async = require('async');

function downloader(packageArray, callback) {
	if (!fs.existsSync(tarballDirectory)) {
		fs.mkdirSync(tarballDirectory);
	}

	if(!fs.existsSync(destinationDirectory)) {
		fs.mkdirSync(destinationDirectory);
	}

	async.each(packageArray, (element, callback) => {
		let elementDirectory = `${destinationDirectory}/${element.name}`;

		exec(`npm view ${element.name} dist.tarball`, (err, stdout, stderr) => {
			if (!err) {
				let url = stdout;
				tarball.extractTarballDownload(url,`${tarballDirectory}/${element.name}.tgz`, 
																			elementDirectory, {}, (err, result) => {
						// the tarball extracts into ./package
						// so it is necessary to copy the extracted files 
						// into the parent directory, then remove the ./package directory
						fs.copySync(elementDirectory + '/package', elementDirectory);
						fs.removeSync(elementDirectory + '/package');
						callback();
				});
			} else {
				console.log(err);
				process.exit(1);
			}
		});
	}, (err) => {
		if (!err) { 
			return callback();
		} else {
			console.log(err);
			process.exit(1);
		}
	});
}