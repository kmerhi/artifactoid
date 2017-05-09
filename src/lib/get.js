const utils = require('../utils/index.js');
const chalk = require('chalk');

exports.builder = {
	uri: {
		default: 'default/path/goes/here'
	}
};

exports.handler = function (argv) {
	const { uri, user, pass } = argv;
	const credentials = utils.getCredentials({ user, pass });

	utils.getDownloadUri(uri, credentials)
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
};