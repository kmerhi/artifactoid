const chalk = require('chalk');

module.exports = function printError(message) {
	console.error(chalk.bgRed.white(' ERROR '), message);
};