#!/usr/bin/env node

const open = require('open');
const yargs = require('yargs');

/* istanbul ignore next */
yargs.version()
	.usage('Usage: artifactoid <command> [options]')
	.command(['get <uri>', 'g', '*'], 'Get latest download URI for given path', require('./cmds/get'))
	.command(['download <uri>', 'pull'], 'Download the latest download URI for given path', require('./cmds/pull'))
	// .command(['upload <uri>', 'push'], 'Upload the latest download URI for given path', require('./cmds/push'))
	.command(['docs'], 'Go to the documentation at github.com/kmerhi/artifactoid', {}, () => open('https://github.com/kmerhi/artifactoid#readme'))
	.demandCommand(1, 'You need at least one command before moving on')
	.help('h')
	.alias('h', 'help')
	.describe('u', 'User to connect to Artifactory repo')
	.alias('u', 'user')
	.describe('p', 'Password (or API key) for basic auth')
	.alias('p', 'pass')
	.epilogue('For more information, go to https://github.com/kmerhi/artifactoid')
	.argv;