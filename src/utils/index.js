const naturalSort = require('natural-sort');
const fetch = require('node-fetch');
const base64 = require('base-64');

module.exports = {
	getCredentials,
	getDownloadUri,
	getNextUri
};

function getCredentials(creds = {}) {
	let {
		user,
		pass
	} = creds;

	if (user && user.indexOf(':') > 0) {
		[user, pass] = user.split(':');
	}

	return {
		user,
		pass
	};
}

function getDownloadUri(uri, creds) {
	const {
		user,
		pass
	} = creds;

	return fetchUri(uri, user, pass).then( json => {
		let children = json.children;
		if (children) {
			const nextUri = getNextUri(uri, children);
			return getDownloadUri(nextUri, creds);
		} else {
			return json.downloadUri;
		}
	});
}

function fetchUri(uri, username, password) {
	const options = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + base64.encode(username + ':' + password)
		},
	};

	return fetch(uri, options).then( response => {
		if (response.status !== 200) {
			throw response.errors;
		}
		return response.json();
	});
}

function getNextUri(uri, children) {
	// Proper natural sorting will bring the newest resource to the top
	children = getSortedChildren(children);
	const nextResource = children[0];

	return uri + nextResource.uri;
}

function getSortedChildren(children) {
	return children.filter(nonPomOrXmlUri).sort(naturalSortUri);
}

function nonPomOrXmlUri(object) {
	return !object.uri.endsWith('.pom') &&
		!object.uri.endsWith('.xml');
}

function naturalSortUri(o1, o2) {
	return naturalSort({
		direction: 'desc'
	})(o1.uri, o2.uri);
}
