const getCredentials = require('../utils/getCredentials');
const getDownloadUri = require('../utils/getDownloadUri');
const processError = require('../utils/processError');

exports.builder = {};

exports.handler = function (argv) {
	const { uri, user, pass } = argv;
	const credentials = getCredentials({ user, pass });

	getDownloadUri(uri, credentials)
		.then(processUri)
		.catch(processError);
};

function processUri(url) {
	console.log(url);
}
