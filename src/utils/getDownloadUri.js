const fetch = require('node-fetch');
const base64 = require('base-64');
const handleErrors = require('./handleErrors');
const getNextUri = require('./getNextUri');

module.exports = function getDownloadUri(uri, creds) {
	const {
		user,
		pass
	} = creds;

	return fetchUri(uri, user, pass)
		.then(json => {
			let children = json.children;
			if (children) {
				const nextUri = getNextUri(uri, children);
				return getDownloadUri(nextUri, creds);
			} else {
				return json.downloadUri;
			}
		});
};

function fetchUri(uri, username, password) {
	const options = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + base64.encode(username + ':' + password)
		},
	};

	return fetch(uri, options)
		.then(handleErrors)
		.then(response => {
			if (response.status !== 200) {
				throw response.errors;
			}
			return response.json();
		});
}