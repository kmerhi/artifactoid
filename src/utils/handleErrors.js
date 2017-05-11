module.exports = function handleErrors(response) {
	if (!response.ok) {
		throw response;
	}
	return response;
};