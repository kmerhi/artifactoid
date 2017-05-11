const fetch = require('isomorphic-fetch');
const base64 = require('base-64');
const handleErrors = require('./handleErrors');

module.exports = function fetchUri(uri, username, password) {
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
};