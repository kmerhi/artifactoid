const getCredentials = require('../utils/getCredentials');
const getDownloadUri = require('../utils/getDownloadUri');
const processError = require('../utils/processError');
const printUri = require('../utils/printUri');
const parseUri = require('../utils/parseUri');

exports.builder = {};

exports.handler = function (argv) {
	const { uri, user, pass, snip } = argv;
	const credentials = getCredentials({ user, pass });

	const processedUri = parseUri(uri);

	getDownloadUri(processedUri, credentials, snip)
		.then(printUri)
		.catch(processError);
};
