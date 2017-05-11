const chalk = require('chalk');
const getCredentials = require('../utils/getCredentials');
const getDownloadUri = require('../utils/getDownloadUri');

exports.builder = {};

exports.handler = function (argv) {
	const { uri, user, pass } = argv;
	const credentials = getCredentials({ user, pass });

	getDownloadUri(uri, credentials)
		.then(url => console.log(url))
		.catch(res => {
			if (res.status === undefined) {
				printError(res.message);
			} else {
				printError(res.statusText + ' (' + res.status + ')');
			}
			process.exit(1);
		});
};

function printError(message) {
	console.error(chalk.bgRed.white(' ERROR '), message);
}
