#!/usr/bin/env node --harmony

var program = require('commander');
var fetch = require('node-fetch');
var base64 = require('base-64');
var chalk = require('chalk');
var naturalSort = require('natural-sort');
var pjson = require('../package.json');

program
	.version(pjson.version)
	.arguments('<uri>')
	.description('A command line tool to retrieve the URI of the latest artifact from an Artifactory repository')
	.option('-u, --username <username>', 'user to connect to Artifactory repo')
	.option('-p, --password <password>', 'password (or API key) for basic auth')
	.action(uri => {
		uriParam = uri;
		const creds = getCreds(program);

		getDownloadUri(uri, creds)
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
		const nextUri = getNextUri(uri, children);
		return await getDownloadUri(nextUri, creds);
	} else {
		return json.downloadUri;
	}
}

function getCreds(program) {
	let {
		username,
		password
	} = program;

	if (username && username.indexOf(':') > 0) {
		[username, password] = username.split(':')
	}

	return {
		username,
		password
	};
}

function getNextUri(uri, children) {
	// Proper natural sorting will bring the newest resource to the top
	children = getSortedChildren(children);
	const nextResource = children[0];

	return uri + nextResource.uri
}

function getSortedChildren(children) {
	return children.filter(nonPomOrXmlUri).sort(naturalSortUri);
}

function nonPomOrXmlUri(object) {
	return !object.uri.endsWith('.pom') &&
		!object.uri.endsWith('.xml');
}

function naturalSortUri(o1, o2) {
	return naturalSort({
		direction: 'desc'
	})(o1.uri, o2.uri)
}