const naturalSort = require('natural-sort');
const fetch = require('node-fetch');
const base64 = require('base-64');

module.exports = {
	getCredentials,
	getNextUri,
	getDownloadUri
};

async function getDownloadUri(uri, creds) {
	const {
		user,
		pass
	} = creds;

	const json = await fetchUri(uri, user, pass);
	let children = json.children;

	if (children) {
		const nextUri = getNextUri(uri, children);
		return await getDownloadUri(nextUri, creds);
	} else {
		return json.downloadUri;
	}
}

async function fetchUri(uri, username, password) {
	const options = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + base64.encode(username + ':' + password)
		},
	};
	const response = await fetch(uri, options);
	const body = await response.json();

	if (response.status !== 200) {
		throw body.errors;
	}

	return body;
}

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
