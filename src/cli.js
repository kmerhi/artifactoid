#!/usr/bin/env node

const open = require('open');
const yargs = require('yargs');

/* istanbul ignore next */
yargs.version()
	.usage('Usage: artifactoid <command> [options]')
	.command(['get <uri>', 'g', '*'], 'Get latest download URI for given path', require('./cmds/get'))
	.command(['docs'], 'Go to the documentation at github.com/kmerhi/artifactoid', {}, () => open('https://github.com/kmerhi/artifactoid#readme'))
	.demandCommand(1, 'You need at least one command before moving on')
	.help('h')
	.alias('h', 'help')
	.options({
		'u': {
			alias: 'user',
			describe: 'User to connect to Artifactory repo',
			type: 'string'
		},
		'p': {
			alias: 'pass',
			describe: 'Password (or API key) for basic auth',
			type: 'string'
		},
		's': {
			alias: 'snip',
			describe: 'Return relative path',
			type: 'boolean'
		},
	})
	.epilogue('For more information, go to https://github.com/kmerhi/artifactoid')
	.argv;
