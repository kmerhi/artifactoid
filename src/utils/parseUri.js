// return url in this format: http://domain:port/artifactory/api/storage/path/to/repo
module.exports = function parseUri(url) {
	let retval = url;
	
	if (url.indexOf('/api/storage') < 0) {
		let parts = url.split('/artifactory/');

		if (parts.length > 1) {
			const baseUrl = parts[0] + '/artifactory/api/storage/';
			const repoPath = parts[1];

			retval = baseUrl + repoPath;
		}
	}

	return retval;
};