#!/usr/bin/env node --harmony

var program = require('commander');
var fetch = require('node-fetch');
var base64 = require('base-64');
var chalk = require('chalk');
var naturalSort = require('natural-sort');
var pjson = require('./package.json');

program
	.version(pjson.version)
	.arguments('<uri>')
	.description('A command line tool to retrieve the URI of the latest artifact from an Artifactory repository')
	.option('-u, --username <username>', 'user to connect to Artifactory repo')
	.option('-p, --password <password>', 'password (or API key) for basic auth')
	.action(uri => {
		let {
			username,
			password
		} = program;

		if (username && username.indexOf(':') > 0) {
			[username, password] = username.split(':')
		}

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