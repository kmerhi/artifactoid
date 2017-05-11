const fetchUri = require('./fetchUri');
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