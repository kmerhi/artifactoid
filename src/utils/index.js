const naturalSort = require('natural-sort');

module.exports = {
	getCredentials,
	getNextUri
};

function getCredentials(program) {
	let {
		username,
		password
	} = program;

	if (username && username.indexOf(':') > 0) {
		[username, password] = username.split(':')
	}

	return {
		username,
		password
	};
}

function getNextUri(uri, children) {
	// Proper natural sorting will bring the newest resource to the top
	children = getSortedChildren(children);
	const nextResource = children[0];

	return uri + nextResource.uri
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
	})(o1.uri, o2.uri)
}
