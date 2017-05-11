module.exports = function getCredentials(creds = {}) {
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
};