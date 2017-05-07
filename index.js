#!/usr/bin/env node --harmony

var program = require('commander');
var fetch = require('node-fetch');
var base64 = require('base-64');
var chalk = require('chalk');
var naturalSort = require('natural-sort');

async function fetchUri(uri, username, password) {
	const response = await fetch(uri, {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + base64.encode(username + ':' + password)
		},
	});
	const body = await response.json();

	if (response.status !== 200) {
		throw body.errors;
	}

	return body;
}

async function getDownloadUri(uri, username, password) {
	const json = await fetchUri(uri, username, password);
	let children = json.children;

	if (children) {
		children = children.filter(child => {
			return !child.uri.endsWith('.pom') && !child.uri.endsWith('.xml'); // return child.folder
		}).sort((o1, o2) => naturalSort({
			direction: 'desc'
		})(o1.uri, o2.uri));

		// Correct sorting will bring the newest resource to the top
		const nextResource = children[0];

		return await getDownloadUri(uri + nextResource.uri, username, password);
	} else {
		return json.downloadUri;
	}
}

program
	.arguments('<uri>')
	.version('0.0.2')
	.description('A command line tool to retrieve that URI to the latest artifact from an Artifactory repo')
	.option('-u, --username <username>', 'The user to authenticate as')
	.option('-p, --password <password>', 'The user\'s password')
	.action(uri => {
		const {
			username,
			password
		} = program;

		getDownloadUri(uri, username, password)
			.then(url => {
				console.log(url);
				process.exit(0);
			})
			.catch((err) => {
				for (let i = 0; i < err.length; i++) {
					const error = err[i];
					console.error(chalk.bgRed.white(' ERROR '), error.message + ' (' + error.status + ')');
				}
				process.exit(1);
			});
	})
	.parse(process.argv);