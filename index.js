#!/usr/bin/env node --harmony

var program = require('commander');
var fetch = require('node-fetch');
var base64 = require('base-64');

async function fetchArtifactList(uri, username, password) {
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

async function showArtifactList(uri, username, password) {
	try {
		const json = await fetchArtifactList(uri, username, password);
		console.log(json.repo);
		console.log(json.path);
		console.log(json.children);
		process.exit(0);
	} catch (err) {
		for (let i = 0; i < err.length; i++) {
			const error = err[i];
			console.error('Error: ' + error.message + ' (' + error.status + ')');
		}
		process.exit(1);
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

		showArtifactList(uri, username, password);
	})
	.parse(process.argv);