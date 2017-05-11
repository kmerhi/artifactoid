const utils = require('../utils/index.js');
const chalk = require('chalk');

exports.builder = {
	
};

exports.handler = function (argv) {
	const { uri, user, pass } = argv;
	const credentials = utils.getCredentials({ user, pass });

	utils.getDownloadUri(uri, credentials)
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
