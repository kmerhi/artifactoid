const fetchUri = require('./fetchUri');
const getNextUri = require('./getNextUri');

module.exports = function getDownloadUri(uri, creds, snip) {
	const {
		user,
		pass
	} = creds;

	return fetchUri(uri, user, pass)
		.then(json => {
			let children = json.children;
			if (children) {
				const nextUri = getNextUri(uri, children);
				return getDownloadUri(nextUri, creds, snip);
			} else {
				let uri = json.downloadUri;
				if (snip) {
					let uriParts = uri.split('/artifactory/');
					uri = '/' + uriParts[1];
				}
				return uri;
			}
		});
};