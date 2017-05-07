#!/usr/bin/env node --harmony

var program = require('commander');
var fetch = require('node-fetch');
var base64 = require('base-64');

program
	.arguments('<uri>')
	.version('0.0.2')
	.description('A command line tool to retrieve that URI to the latest artifact from an Artifactory repo')
	.option('-u, --username <username>', 'The user to authenticate as')
	.option('-p, --password <password>', 'The user\'s password')
	.action(function (uri) {
		const { username, password } = program;

		console.log('user: %s pass: %s uri: %s',
			program.username, program.password, uri);

		fetch(uri, {
				method: 'get',
				headers: {
					'Authorization': 'Basic ' + base64.encode(username + ':' + password)
				},
			})
			.then(res => res.json())
			.then(json => console.log(json))
			.catch(err => console.error(err));
	})
	.parse(process.argv);