#!/usr/bin/env node

const open = require('open');
const yargs = require('yargs');

yargs.version()
	.usage('Usage: artifactoid <command> [options]')
	.command(['get <uri>', 'g', '*'], 'Get latest download URI for given path', require('./lib/get'))
	.example('artifactoid init my-project', 'Initialize `my-project` directory with `default` engine')
	.example('artifactoid init my-project --engine turbo', 'Initialize `my-project` directory with `turbo` engine')
	.command(['docs'], 'Go to the documentation at github.com/kmerhi/artifactoid', {}, () => open('https://github.com/kmerhi/artifactoid#readme'))
	.demandCommand(1, 'You need at least one command before moving on')
	.help('h')
	.alias('h', 'help')
	.describe('u', 'User to connect to Artifactory repo')
	.alias('u', 'user')
	.describe('p', 'Password (or API key) for basic auth')
	.alias('p', 'pass')
	.boolean('v')
	.describe('v', 'Show verbose output')
	.alias('v', 'verbose')
	.epilogue('For more information, go to https://github.com/kmerhi/artifactoid')
	.argv;