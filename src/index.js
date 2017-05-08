#!/usr/bin/env node --harmony

const program = require('commander');
const fetch = require('node-fetch');
const chalk = require('chalk');
const base64 = require('base-64');
const pjson = require('../package.json');
const utils = require('./utils/index.js');

let uriParam;

program
	.version(pjson.version)
	.arguments('<uri>')
	.description('A command line tool to retrieve the URI of the latest artifact from an Artifactory repository')
	.option('-u, --username <username>', 'user to connect to Artifactory repo')
	.option('-p, --password <password>', 'password (or API key) for basic auth')
	.action(uri => {
		uriParam = uri;
		const credentials = utils.getCredentials(program);

		getDownloadUri(uri, credentials)
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

if (typeof uriParam === 'undefined') {
	console.error(chalk.bgRed.white(' ERROR '), 'uri is required');
	process.exit(1);
}

async function fetchUri(uri, username, password) {
	const options = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + base64.encode(username + ':' + password)
		},
	};
	const response = await fetch(uri, options);
	const body = await response.json();

	if (response.status !== 200) {
		throw body.errors;
	}

	return body;
}

async function getDownloadUri(uri, creds) {
	const {
		username,
		password
	} = creds;

	const json = await fetchUri(uri, username, password);
	let children = json.children;

	if (children) {
		const nextUri = utils.getNextUri(uri, children);
		return await getDownloadUri(nextUri, creds);
	} else {
		return json.downloadUri;
	}
}
