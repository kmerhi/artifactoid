const printError = require('./printError');

module.exports = function processError(res) {
	if (res.status === undefined) {
		printError(res.message);
	} else {
		printError(res.statusText + ' (' + res.status + ')');
	}
	process.exit(1);
};